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
const tree = fs.mkdtempSync(path.join(os.tmpdir(), 'lf-skills-storybook-'));
const output = path.resolve(outputFile);

try {
	const tarball = path.join(tree, 'tree.tar');
	// `git archive` fails on any path absent from the tree, and the root tsconfigs changed across majors.
	const entries = execFileSync('git', ['ls-tree', '--name-only', treeish], { cwd: repo, encoding: 'utf8' })
		.split('\n')
		.filter((entry) => ['.storybook', 'stories', 'packages', 'package.json'].includes(entry) || /^tsconfig.*\.json$/.test(entry));
	execFileSync('git', ['archive', '--format=tar', '-o', tarball, treeish, '--', ...entries], { cwd: repo });
	execFileSync('tar', ['-xf', tarball, '-C', tree]);
	fs.rmSync(tarball);
	fs.symlinkSync(path.join(repo, 'node_modules'), path.join(tree, 'node_modules'));

	process.chdir(tree);
	const coreServer = createRequire(path.join(repo, 'package.json')).resolve('storybook/internal/core-server');
	const { build } = await import(pathToFileURL(coreServer).href);
	await build({ mode: 'index', configDir: '.storybook', outputFile: output });
} finally {
	process.chdir(repo);
	fs.rmSync(tree, { recursive: true, force: true });
}
