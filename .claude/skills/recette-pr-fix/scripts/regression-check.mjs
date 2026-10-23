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
// Templates and styles count too: a rendering fix may change no TypeScript at all.
const sources = present.filter((p) => /^packages\/.+\.(ts|html|scss)$/.test(p) && !/\.spec\.ts$/.test(p));

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
	const touched = touchedTests();
	const keep = (name) => touched.newSpec || touched.titles.some((title) => title.test(name));

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
	if (!proven.length && !suspicious.length && touched.outside && !withoutFix.loadErrors.length) {
		// The changes could not be tied to a test (helper, setup, test component): no test proves the fix
		console.log('⚠️  No test fails without the fix (spec changes outside any identified test)');
	} else if (!proven.length && !suspicious.length && !withoutFix.loadErrors.length) {
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
		// No --project: each spec runs in the project that owns it (schematics specs live in their own one)
		await run('npx', ['vitest', 'run', '--reporter=json', `--outputFile=${output}`, ...specs], { cwd, maxBuffer: 64 * 1024 * 1024 });
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

// Tests enclosing each line changed by the branch (it/test, .each, .only…): { titles, outside, newSpec }.
// `outside`: some changes sit outside any test (helper, setup, test component); `newSpec`: every test is new.
function touchedTests() {
	const declaration = /^\s*(?:it|test)(?:\.\w+)*(?:\.each\s*(?:\([^)]*\)|`[^`]*`))?\s*\(\s*(['"`])(.+?)\1/;
	const titles = new Set();
	let outside = false;
	for (const spec of specs) {
		if (!lines(git('ls-tree', '--name-only', mergeBase, '--', spec)).length) return { titles: [], outside: false, newSpec: true };
		const fileLines = readFileSync(join(root, spec), 'utf8').split('\n');
		const changedLines = lines(git('diff', '-U0', mergeBase, '--', spec))
			.filter((l) => l.startsWith('@@'))
			.flatMap((l) => {
				const [, start, count = '1'] = /\+(\d+)(?:,(\d+))?/.exec(l);
				// A pure deletion (count 0) still changes the test around its position
				return Number(count) ? Array.from({ length: Number(count) }, (_, i) => Number(start) + i) : [Math.max(1, Number(start))];
			});
		for (const n of changedLines) {
			// Blank lines and lone closing brackets belong to no test: they would be attributed to the test above
			if (/^\s*[})\];,]*\s*$/.test(fileLines[n - 1] ?? '')) continue;
			let i = n - 1;
			// Leaving the enclosing block upwards (describe, hook or file top) means the change is outside any test
			while (i >= 0 && !declaration.test(fileLines[i]) && !/^\s*(?:describe|beforeEach|afterEach|beforeAll|afterAll)\b|^\S/.test(fileLines[i])) i--;
			if (i >= 0 && declaration.test(fileLines[i])) titles.add(declaration.exec(fileLines[i])[2]);
			else outside = true;
		}
	}
	// it.each titles hold placeholders (%s, %d, $name): match them loosely against the reported full names
	const matchers = [...titles].map((t) => new RegExp(`${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%[sdifjo#%]|\\\$\w+/g, '.*')}$`));
	return { titles: matchers, outside, newSpec: false };
}

function short(fullName) {
	return `"${fullName.split(' ').slice(-8).join(' ')}"`;
}
