#!/usr/bin/env node
// Checks that the specs touched by the branch actually cover the fix: they must pass with it and fail without it.
// Runs the branch's specs against the base sources in a temporary worktree; the working tree is never modified.
// Usage: node .claude/skills/recette-pr-fix/scripts/regression-check.mjs --base origin/<branch>
// Never exits with 1: a test that does not fail without the fix is a ⚠️ for the author to judge.

import { execFile, execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);
const git = (...a) => execFileSync('git', a, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim();
const lines = (s) => (s ? s.split('\n') : []);

const args = process.argv.slice(2);
const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'origin/master';
const root = git('rev-parse', '--show-toplevel');
const mergeBase = git('merge-base', base, 'HEAD');

const present = [...new Set([...lines(git('diff', '--name-only', '--diff-filter=d', mergeBase)), ...lines(git('ls-files', '--others', '--exclude-standard'))])];
const specs = present.filter((p) => /^packages\/.+\.spec\.ts$/.test(p));
const sources = present.filter((p) => /^packages\/.+\.ts$/.test(p) && !/\.spec\.ts$/.test(p));

console.log(`regression-check · ${specs.length} spec(s) vs ${base} (${mergeBase.slice(0, 9)})\n`);
if (!specs.length || !sources.length) {
	console.log('ℹ️  Skipped: the diff does not change both sources and specs');
	process.exit(0);
}

const worktree = mkdtempSync(join(tmpdir(), 'recette-regression-'));
try {
	// Base sources + the branch's specs
	git('worktree', 'add', '--detach', '--quiet', worktree, mergeBase);
	symlinkSync(join(root, 'node_modules'), join(worktree, 'node_modules'));
	for (const spec of specs) {
		mkdirSync(dirname(join(worktree, spec)), { recursive: true });
		copyFileSync(join(root, spec), join(worktree, spec));
	}

	const [withFix, withoutFix] = await Promise.all([vitest(root, 'with'), vitest(worktree, 'without')]);

	const proven = [];
	const notProven = [];
	const unevaluable = [];
	for (const [name, status] of withFix.tests) {
		if (status !== 'passed') continue;
		const other = withoutFix.tests.get(name);
		if (other === 'failed') proven.push(name);
		else if (other === 'passed') notProven.push(name);
		else unevaluable.push(name);
	}
	// Only tests added or modified by the branch matter: an untouched test passing on both sides is expected.
	const touched = touchedTestNames();
	const keep = (name) => !touched || [...touched].some((t) => name.endsWith(t));

	if (withoutFix.loadErrors.length) {
		console.log(`ℹ️  Could not load without the fix (not evaluable): ${withoutFix.loadErrors.join(', ')}`);
	}
	if (proven.length) {
		console.log(`✅ Fails without the fix: ${proven.map(short).join(' · ')}`);
	}
	const suspicious = notProven.filter(keep);
	if (suspicious.length) {
		console.log(`⚠️  Passes without the fix too (does not cover the bug?): ${suspicious.map(short).join(' · ')}`);
	}
	if (!proven.length && !suspicious.length && !withoutFix.loadErrors.length) {
		console.log(`ℹ️  Not evaluable: ${unevaluable.length ? unevaluable.map(short).join(' · ') : 'no passing test with the fix'}`);
	}
} catch (error) {
	console.log(`ℹ️  Check could not run: ${String(error.message ?? error).split('\n')[0]}`);
} finally {
	try {
		git('worktree', 'remove', '--force', worktree);
	} catch {
		rmSync(worktree, { recursive: true, force: true });
		git('worktree', 'prune');
	}
}

// Runs the specs in `cwd` and returns { tests: Map<fullName, status>, loadErrors: string[] }
async function vitest(cwd, label) {
	const output = join(tmpdir(), `recette-vitest-${label}-${process.pid}.json`);
	try {
		await run('npx', ['vitest', 'run', '--project', 'lucca-front', '--reporter=json', `--outputFile=${output}`, ...specs], { cwd, maxBuffer: 64 * 1024 * 1024 });
	} catch {
		// Non-zero exit on failing tests: the JSON report is still written
	}
	if (!existsSync(output)) throw new Error(`no vitest report ${label} the fix`);
	const report = JSON.parse(readFileSync(output, 'utf8'));
	rmSync(output, { force: true });
	const tests = new Map();
	const loadErrors = [];
	for (const file of report.testResults) {
		if (!file.assertionResults.length && file.status === 'failed') loadErrors.push(file.name.replace(`${cwd}/`, ''));
		for (const t of file.assertionResults) tests.set(t.fullName, t.status);
	}
	return { tests, loadErrors };
}

// Titles of it()/test() blocks on lines added by the branch; null when the specs are new files (every test counts).
function touchedTestNames() {
	const names = new Set();
	for (const spec of specs) {
		if (!lines(git('ls-tree', '--name-only', mergeBase, '--', spec)).length) return null;
		for (const l of lines(git('diff', '-U0', mergeBase, '--', spec))) {
			const m = /^\+\s*(?:it|test)\(\s*['"`](.+?)['"`]/.exec(l);
			if (m) names.add(m[1]);
		}
	}
	return names;
}

function short(fullName) {
	return `"${fullName.split(' ').slice(-8).join(' ')}"`;
}
