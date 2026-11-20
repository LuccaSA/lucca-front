#!/usr/bin/env node
// Makes sure a fix PR is not opened by Claude Code before the recette ran on the branch.
//
// --mark <ready|check|fix|skip> [--base <base>] [--reason "<why>"]
//   Called by the skill at the end of the report (step 4), or with `skip` when the author explicitly waives the recette.
//   Records the verdict, the base and the tested tree (working tree, uncommitted and untracked files included) in
//   <git dir>/recette-pr-fix/<branch>.json (local, never committed).
//
// --check
//   PreToolUse hook on Bash (.claude/settings.json). Reads the tool call on stdin and blocks (exit 2) a `gh pr create`:
//   - chained after a command that moves the checkout or HEAD (the hook only sees the state before the whole call);
//   - for a fix (branch fix/*, --head fix/*, or title "fix(...)" / "fix:") when it is not opened from the checked-out
//     fix branch, when no verdict is recorded, when it is ❌, when --base differs from the recette's base, or when the
//     committed packages/ differ from the tested tree.
//   Any other command, or any unexpected error, lets the call through.

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const VERDICTS = { ready: '✅ Ready', check: '⚠️ To check', fix: '❌ To fix', skip: '⏭️ Skipped' };

const git = (args, env) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], env }).trim();
const markerPath = (branch) =>
	join(git(['rev-parse', '--path-format=absolute', '--git-path', 'recette-pr-fix']), `${branch.replaceAll('/', '__')}.json`);
const shortBranch = (ref) => ref?.replace(/^(refs\/heads\/|origin\/)/, '');

const args = process.argv.slice(2);
const opt = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);

if (args.includes('--mark')) mark();
else if (args.includes('--check')) check();
else {
	console.error('Usage: gate.mjs --mark <ready|check|fix|skip> [--base <base>] [--reason "<why>"] | --check');
	process.exit(1);
}

// Tree of the working tree as the recette saw it (tracked changes and untracked files), through a throwaway index.
function workingTree() {
	const index = join(tmpdir(), `recette-pr-fix-gate-${process.pid}`);
	const env = { ...process.env, GIT_INDEX_FILE: index };
	try {
		git(['read-tree', 'HEAD'], env);
		git(['add', '-A', '--', ':/'], env);
		return git(['write-tree'], env);
	} finally {
		rmSync(index, { force: true });
	}
}

function mark() {
	const verdict = opt('--mark');
	if (!VERDICTS[verdict]) {
		console.error(`Unknown verdict "${verdict}": expected ${Object.keys(VERDICTS).join(', ')}`);
		process.exit(1);
	}
	const reason = opt('--reason');
	if (verdict === 'skip' && !reason) {
		console.error('A skipped recette needs --reason "<why>"');
		process.exit(1);
	}
	const branch = git(['branch', '--show-current']);
	const file = markerPath(branch);
	mkdirSync(dirname(file), { recursive: true });
	writeFileSync(
		file,
		JSON.stringify(
			{ branch, base: shortBranch(opt('--base')), tree: workingTree(), verdict, reason, date: new Date().toISOString() },
			null,
			'\t',
		),
	);
	console.log(`recette-pr-fix gate: ${VERDICTS[verdict]} recorded for ${branch} @ ${git(['rev-parse', '--short', 'HEAD'])}`);
}

function check() {
	try {
		const command = JSON.parse(readFileSync(0, 'utf8'))?.tool_input?.command ?? '';
		const create = /\bgh\s+pr\s+create\b/.exec(command);
		if (!create) return;
		const before = command.slice(0, create.index);
		const after = command.slice(create.index);
		const flag = (re) => re.exec(after)?.[1];

		const block = (why) => {
			console.error(
				`recette-pr-fix gate: ${why}\n` +
					'Run the recette-pr-fix skill before opening a fix PR (CLAUDE.md, "Recette avant PR"), then retry. ' +
					'If the user explicitly waives it, record why with: ' +
					'node .claude/skills/recette-pr-fix/scripts/gate.mjs --mark skip --reason "<why>"',
			);
			process.exit(2);
		};

		if (/(^|[\s;&|(])(cd|git\s+(commit|checkout|switch|rebase|reset|pull|merge|cherry-pick|am|stash|worktree))\b/.test(before)) {
			block('run `gh pr create` in its own command: the gate checks the state before the whole command runs.');
		}

		const branch = git(['branch', '--show-current']);
		const head = shortBranch(
			flag(/(?:^|\s)(?:--head|-H)(?:=|\s+)["']?([^\s"']+)/)
				?.split(':')
				.pop(),
		);
		const title = flag(/(?:^|\s)(?:--title|-t)(?:=|\s+)["']?([^"'\n]*)/);
		const isFix = [branch, head].some((b) => /^fix\//.test(b ?? '')) || /^fix(\(|:)/.test(title ?? '');
		if (!isFix) return;

		if (head && head !== branch)
			block(`--head is "${head}" but the checked-out branch is "${branch}": open the PR from the checked-out branch.`);
		if (!/^fix\//.test(branch)) {
			block(`the PR title says fix but the current branch is "${branch}". Switch to the fix branch first (one step per command).`);
		}

		let marker;
		try {
			marker = JSON.parse(readFileSync(markerPath(branch), 'utf8'));
		} catch {
			block(`no recette recorded for ${branch}.`);
		}

		if (marker.verdict === 'fix') block('the last recette verdict is ❌: fix the reported issues and run the recette again.');

		const base = shortBranch(flag(/(?:^|\s)(?:--base|-B)(?:=|\s+)["']?([^\s"']+)/));
		if (base && marker.base && base !== marker.base) block(`the recette ran against ${marker.base}, not ${base}.`);

		const touched = git(['diff', '--name-only', marker.tree, 'HEAD', '--', ':/packages/']);
		if (touched) block(`committed packages/ differ from what the recette tested:\n${touched}`);
	} catch {
		// Never block a command because the gate itself failed (no git repo, unreadable input…)
	}
}
