#!/usr/bin/env node
// Makes sure a fix PR is not opened by Claude Code before the recette ran on the branch.
//
// --mark <ready|check|fix|skip> [--reason "<why>"]
//   Called by the skill at the end of the report (step 4), or with `skip` when the author explicitly waives the recette.
//   Records the verdict for the current HEAD in <git dir>/recette-pr-fix/<branch>.json (local, never committed).
//
// --check
//   PreToolUse hook on Bash (.claude/settings.json). Reads the tool call on stdin and blocks (exit 2) a `gh pr create`
//   for a fix (branch fix/* or title "fix(...)" / "fix:") when no verdict is recorded, when it is ❌, or when commits
//   touching packages/ landed after the recette. Any other command, or any unexpected error, lets the call through.

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const VERDICTS = { ready: '✅ Ready', check: '⚠️ To check', fix: '❌ To fix', skip: '⏭️ Skipped' };

const git = (...a) => execFileSync('git', a, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
const markerPath = (branch) =>
	join(git('rev-parse', '--path-format=absolute', '--git-path', 'recette-pr-fix'), `${branch.replaceAll('/', '__')}.json`);

const args = process.argv.slice(2);
const opt = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);

if (args.includes('--mark')) mark();
else if (args.includes('--check')) check();
else {
	console.error('Usage: gate.mjs --mark <ready|check|fix|skip> [--reason "<why>"] | --check');
	process.exit(1);
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
	const branch = git('branch', '--show-current');
	const file = markerPath(branch);
	mkdirSync(dirname(file), { recursive: true });
	writeFileSync(
		file,
		JSON.stringify({ branch, sha: git('rev-parse', 'HEAD'), verdict, reason, date: new Date().toISOString() }, null, '\t'),
	);
	console.log(`recette-pr-fix gate: ${VERDICTS[verdict]} recorded for ${branch} @ ${git('rev-parse', '--short', 'HEAD')}`);
}

function check() {
	try {
		const command = JSON.parse(readFileSync(0, 'utf8'))?.tool_input?.command ?? '';
		if (!/\bgh\s+pr\s+create\b/.test(command)) return;

		const branch = git('branch', '--show-current');
		const isFix = /^fix\//.test(branch) || /--title[=\s]+["']?fix(\(|:)/.test(command);
		if (!isFix) return;

		const block = (why) => {
			console.error(
				`recette-pr-fix gate: ${why}\n` +
					'Run the recette-pr-fix skill before opening a fix PR (CLAUDE.md, "Recette avant PR"), then retry. ' +
					'If the user explicitly waives it, record why with: ' +
					'node .claude/skills/recette-pr-fix/scripts/gate.mjs --mark skip --reason "<why>"',
			);
			process.exit(2);
		};

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

		const head = git('rev-parse', 'HEAD');
		if (marker.sha !== head) {
			let ancestor = true;
			try {
				git('merge-base', '--is-ancestor', marker.sha, head);
			} catch {
				ancestor = false;
			}
			if (!ancestor) block('the branch was rewritten since the recette (rebase, amend…).');
			const touched = git('diff', '--name-only', marker.sha, head, '--', 'packages/');
			if (touched) block(`packages/ changed since the recette (${marker.sha.slice(0, 9)}):\n${touched}`);
		}
	} catch {
		// Never block a command because the gate itself failed (no git repo, unreadable input…)
	}
}
