#!/usr/bin/env node
// Collects the context of a fix branch (base, impacted scope, lint targets) and checks the repo conventions CI does not cover.
// Compares the working tree (committed + uncommitted + untracked) against the merge-base with the base branch.
// Usage: node .claude/skills/recette-pr-fix/scripts/branch-context.mjs [--base origin/<branch>] [--issue <n>]
// Without --base: the open PR's base, otherwise the closest of master / release/* / *-lts.
// Exit code: 1 if at least one ❌, 0 otherwise.

import { execFileSync } from 'node:child_process';

const git = (...a) => execFileSync('git', a, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim();
const lines = (s) => (s ? s.split('\n') : []);

const args = process.argv.slice(2);
const [base, baseSource] = args.includes('--base') ? [args[args.indexOf('--base') + 1], '--base'] : detectBase();

// Base of the open PR if any, otherwise the candidate branch the current branch is the fewest commits ahead of.
function detectBase() {
	try {
		const prBase = execFileSync('gh', ['pr', 'view', '--json', 'baseRefName', '--jq', '.baseRefName'], {
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'ignore'],
		}).trim();
		if (prBase) return [`origin/${prBase}`, 'PR'];
	} catch {
		// No PR for this branch (or gh unavailable): fall back to detection
	}
	const candidates = lines(
		git(
			'for-each-ref',
			'--format=%(refname:short)',
			'refs/remotes/origin/master',
			'refs/remotes/origin/release/*',
			'refs/remotes/origin/*-lts',
		),
	);
	const [closest] = candidates
		.map((ref) => ({ ref, ahead: Number(git('rev-list', '--count', `${ref}..HEAD`)) }))
		.sort((a, b) => a.ahead - b.ahead); // stable sort: master wins ties
	return [closest.ref, 'detected'];
}

const results = [];
const ok = (msg) => results.push(`✅ ${msg}`);
const warn = (msg) => results.push(`⚠️  ${msg}`);
const fail = (msg) => results.push(`❌ ${msg}`);
const info = (msg) => results.push(`ℹ️  ${msg}`);

const mergeBase = git('merge-base', base, 'HEAD');
const branch = git('branch', '--show-current');

// Changed files: committed + uncommitted against the merge-base, plus untracked files.
const changed = new Map(); // path -> status (A, M, D…)
for (const l of lines(git('diff', '--name-status', '--no-renames', mergeBase))) {
	const [status, path] = l.split('\t');
	changed.set(path, status[0]);
}
for (const path of lines(git('ls-files', '--others', '--exclude-standard'))) {
	changed.set(path, 'A');
}
const present = [...changed].filter(([, s]) => s !== 'D').map(([p]) => p);

// 1. Branch name
const branchMatch = /^fix\/([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(branch);
if (!branchMatch) {
	fail(`Branch "${branch}" does not follow fix/kebab-case-description`);
} else if (branchMatch[1].length > 50) {
	warn(`Branch description is ${branchMatch[1].length} chars (max 50)`);
} else {
	ok(`Branch "${branch}"`);
}

const behind = Number(git('rev-list', '--count', `${mergeBase}..${base}`));
info(`Base: ${base.replace(/^origin\//, '')} (${baseSource})${behind ? `, ${behind} commits behind` : ''}`);

if (changed.size === 0) {
	info('No changes against base');
	print();
}

// 2. Regression test
const srcChanged = present.filter((p) => /^packages\/(ng|prisme)\/.+(?<!\.spec)\.ts$/.test(p) && !p.includes('/schematics/'));
const testsChanged = present.filter((p) => /\.spec\.ts$/.test(p) || p.startsWith('stories/e2e/'));
const scssChanged = present.filter((p) => /^packages\/scss\/.+\.scss$/.test(p));
if (srcChanged.length && !testsChanged.length) {
	warn('TS sources changed but no *.spec.ts nor stories/e2e/ test in the diff: is there a regression test?');
} else if (testsChanged.length) {
	ok(`Tests in diff: ${testsChanged.join(', ')}`);
} else if (scssChanged.length) {
	info('SCSS-only change: no automated test expected, visual proof needed');
}

// 3. Impacted scope (used by the skill to pick stories and assess risk)
const entrypoints = new Set(
	present
		.map((p) => /^packages\/(ng|prisme)\/([^/]+)\//.exec(p))
		.filter(Boolean)
		.map((m) => `@lucca-front/${m[1]}/${m[2]}`),
);
const scssComponents = new Set(present.map((p) => /^packages\/scss\/src\/components\/([^/]+)\//.exec(p)?.[1]).filter(Boolean));
const shared = present.filter(
	(p) => /^packages\/(ng\/core|prisme\/core|ng\/core-select|scss\/src\/commons)\//.test(p) && !p.endsWith('/highlight-prisme.scss'),
);
if (entrypoints.size) info(`Entrypoints: ${[...entrypoints].join(', ')}`);
if (scssComponents.size) info(`SCSS components: ${[...scssComponents].join(', ')}`);
if (shared.length) warn(`Shared code touched (wide blast radius): ${shared.join(', ')}`);

const lintable = present.filter((p) => /^packages\/.+\.(ts|mjs|js)$/.test(p));
const stylable = present.filter((p) => /^packages\/.+\.scss$/.test(p));
info(`Lint targets: ${lintable.length} ts/js, ${stylable.length} scss`);

// 4. Linked issue (the audit checks the fix against its intent, the bug replay reuses its reproduction steps)
const issues = linkedIssues();
if (issues.length) {
	for (const i of issues) info(`Linked issue: #${i.number} "${i.title}" (${i.state.toLowerCase()}) — gh issue view ${i.number}`);
} else {
	info('No linked issue (PR closing reference, "Fixes #n" in a commit, or --issue <n>)');
}

print();

// Issues from --issue, the open PR's closing references and closing keywords in the branch's commits.
function linkedIssues() {
	const numbers = new Set();
	if (args.includes('--issue')) numbers.add(args[args.indexOf('--issue') + 1]);
	try {
		const refs = execFileSync('gh', ['pr', 'view', '--json', 'closingIssuesReferences', '--jq', '.closingIssuesReferences[].number'], {
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'ignore'],
		});
		lines(refs.trim()).forEach((n) => numbers.add(n));
	} catch {
		// No PR yet
	}
	const messages = git('log', '--format=%B', `${mergeBase}..HEAD`);
	for (const m of messages.matchAll(/\b(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s*:?\s+(?:[\w.-]+\/[\w.-]+)?#(\d+)/gi)) numbers.add(m[1]);
	// "#n" may be a pull request: keep actual issues only
	return [...numbers].flatMap((n) => {
		try {
			const issue = JSON.parse(
				execFileSync('gh', ['issue', 'view', n, '--json', 'number,title,state,url'], {
					encoding: 'utf8',
					stdio: ['ignore', 'pipe', 'ignore'],
				}),
			);
			return issue.url.includes('/issues/') ? [issue] : [];
		} catch {
			return [];
		}
	});
}

function print() {
	console.log(`recette-pr-fix · ${branch} vs ${base} (${mergeBase.slice(0, 9)}) · ${changed.size} files\n`);
	console.log(results.join('\n'));
	process.exit(results.some((r) => r.startsWith('❌')) ? 1 : 0);
}
