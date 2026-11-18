// Writes the Storybook index.json of a git tree-ish without building or deploying Storybook:
//   node scripts/generate-skills/build-storybook-index.mjs <tree-ish> <output-file>
// The index only parses the stories, so the tree is extracted next to the repo's node_modules.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const [treeish, outputFile] = process.argv.slice(2);
if (!treeish || !outputFile) {
	console.error('usage: build-storybook-index.mjs <tree-ish> <output-file>');
	process.exit(1);
}

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const PREFIX = 'lf-skills-storybook-';
// The index build keeps handles on its tree until the process exits, so a run's own cleanup can lose
// the race and leave the tree behind (EPERM on Windows). Reap what earlier runs left: a tree a live
// run still owns just fails to delete and stays, so at most one stale tree survives a run.
for (const stale of fs.readdirSync(os.tmpdir()).filter((entry) => entry.startsWith(PREFIX))) {
	try {
		fs.rmSync(path.join(os.tmpdir(), stale), { recursive: true, force: true });
	} catch {}
}
const tree = fs.mkdtempSync(path.join(os.tmpdir(), PREFIX));
const output = path.resolve(outputFile);

try {
	const tarball = path.join(tree, 'tree.tar');
	// `git archive` fails on any path absent from the tree, and the root tsconfigs changed across majors.
	const entries = execFileSync('git', ['ls-tree', '--name-only', treeish], { cwd: repo, encoding: 'utf8' })
		.split('\n')
		.filter((entry) => ['.storybook', 'stories', 'packages', 'package.json'].includes(entry) || /^tsconfig.*\.json$/.test(entry));
	execFileSync('git', ['archive', '--format=tar', '-o', tarball, treeish, '--', ...entries], { cwd: repo });
	// Extracted from `tree`, on relative paths: GNU tar — what `tar` resolves to under Git Bash, and
	// so under the pre-commit hook — reads the `C:` of an absolute `-f` as a remote host and refuses
	// to connect. Windows bsdtar takes absolute paths but rejects `--force-local`, so relative it is.
	execFileSync('tar', ['-xf', path.basename(tarball)], { cwd: tree });
	fs.rmSync(tarball);
	// 'junction' rather than a directory symlink: Windows asks for admin rights or Developer Mode for the
	// latter (EPERM), never for the former. The type is ignored everywhere else.
	fs.symlinkSync(path.join(repo, 'node_modules'), path.join(tree, 'node_modules'), 'junction');

	process.chdir(tree);
	const coreServer = createRequire(path.join(repo, 'package.json')).resolve('storybook/internal/core-server');
	const { build } = await import(pathToFileURL(coreServer).href);
	await build({ mode: 'index', configDir: '.storybook', outputFile: output });
} finally {
	process.chdir(repo);
	// Windows holds handles on the extracted tree for a moment after the index build: retry, then give
	// up rather than fail — a leftover temp dir is harmless, and a throw here would mask a build error.
	try {
		fs.rmSync(tree, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
	} catch {}
}
