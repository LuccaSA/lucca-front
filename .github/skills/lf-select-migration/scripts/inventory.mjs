#!/usr/bin/env node
/**
 * Inventory of the deprecated Lucca Front selects in an Angular front.
 *
 * Prints:
 * - the deprecated `@lucca-front/ng/(select|option|api|department|establishment|user/select)` imports per file;
 * - the deprecated select elements per template (count per tag, then the templates using them);
 * - the home-made wrappers around a deprecated select (component selector → file);
 * - byte-identical duplicates among the touched files (migrate one, copy the diff to the other).
 *
 * Usage:
 *   node inventory.mjs [<front-src-dir>]   (default: src/app)
 *
 * Zero dependency, Node >= 18.
 */
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] ?? 'src/app';
if (!existsSync(root)) {
	console.error(`Directory not found: ${root}`);
	process.exit(1);
}

const IMPORT_RE = /@lucca-front\/ng\/(select|option|api|department|establishment|user\/select)['/]/g;
const ELEMENT_RE =
	/<(lu-select|lu-api-select|lu-user-select|lu-department-select|lu-establishment-select|lu-option-picker(?:-advanced)?|lu-option-select-all|lu-api-paged-searcher)\b/g;
const SELECT_RE = /<(lu-select|lu-api-select|lu-user-select|lu-department-select|lu-establishment-select)\b/;
const WRAPPED_RE = /<(lu-select|lu-api-select|lu-user-select|lu-establishment-select|lu-option-picker)/;
const SELECTOR_RE = /selector: *'[^']+'/g;

function* walk(dir) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
		const path = join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(path);
		else if (entry.name.endsWith('.ts') || entry.name.endsWith('.html')) yield path;
	}
}

const files = [...walk(root)].sort().map((path) => ({ path, content: readFileSync(path, 'utf8') }));
const tsFiles = files.filter((f) => f.path.endsWith('.ts'));
const htmlFiles = files.filter((f) => f.path.endsWith('.html'));

console.log('== deprecated imports (file: count)');
for (const { path, content } of tsFiles) {
	const count = content.match(IMPORT_RE)?.length ?? 0;
	if (count) console.log(`${path}: ${count}`);
}

console.log('\n== deprecated elements per template');
const elementCounts = new Map();
for (const { content } of htmlFiles) {
	for (const [, tag] of content.matchAll(ELEMENT_RE)) elementCounts.set(tag, (elementCounts.get(tag) ?? 0) + 1);
}
for (const [tag, count] of [...elementCounts].sort((a, b) => b[1] - a[1])) console.log(`${String(count).padStart(5)} <${tag}`);
console.log();
for (const { path, content } of htmlFiles) {
	if (SELECT_RE.test(content)) console.log(path);
}

console.log('\n== home-made wrappers around a deprecated select (component selector -> file)');
const wrappers = new Set();
for (const { path, content } of htmlFiles) {
	if (!WRAPPED_RE.test(content)) continue;
	const tsPath = path.replace(/\.html$/, '.ts');
	if (!existsSync(tsPath)) continue;
	for (const [selector] of readFileSync(tsPath, 'utf8').matchAll(SELECTOR_RE)) wrappers.add(`${tsPath}: ${selector}`);
}
[...wrappers].sort().forEach((line) => console.log(line));

console.log('\n== byte-identical duplicates among touched templates/ts (migrate one, copy the diff)');
const byHash = new Map();
for (const { path, content } of files) {
	if (!SELECT_RE.test(content) && !new RegExp(IMPORT_RE.source).test(content)) continue;
	const hash = createHash('md5').update(content).digest('hex');
	byHash.set(hash, [...(byHash.get(hash) ?? []), path]);
}
for (const paths of byHash.values()) {
	for (let i = 1; i < paths.length; i++) console.log(`${paths[0]} == ${paths[i]}`);
}
