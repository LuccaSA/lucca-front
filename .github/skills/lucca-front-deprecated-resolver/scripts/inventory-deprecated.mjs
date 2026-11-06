#!/usr/bin/env node
/**
 * Inventory of deprecated Lucca Front symbols used by an Angular workspace.
 *
 * Reads the INSTALLED packages (node_modules), not a hard-coded table:
 * - collects named imports from `@lucca-front/ng/*`, `@lucca-front/prisme/*` and `@lucca/prisme/*`
 *   in every source root of the workspace (angular.json projects, or the whole workspace);
 * - resolves each entrypoint to its `.d.ts` through package.json `exports`, following `export *`
 *   and `export { … } from` re-exports (e.g. `@lucca-front/ng/tooltip` → `@lucca/prisme/tooltip`);
 * - reports every imported symbol whose declaration carries a `@deprecated` JSDoc tag,
 *   with each usage site and its context (`imports` of a @Component, `importProvidersFrom`, `providers`…);
 * - for deprecated NgModules, reads `ɵinj` in the fesm2022 bundle to tell whether the module declares providers.
 *
 * Usage:
 *   node inventory-deprecated.mjs [--workspace <dir>] [--root <dir>]... [--json]
 *
 * Zero dependency, Node >= 18.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const PACKAGES = ['@lucca-front/ng', '@lucca-front/prisme', '@lucca/prisme'];
const IGNORED_DIRS = new Set(['node_modules', 'dist', '.angular', '.git', '.nx', 'coverage', 'tmp', '.claude']);

// ---------------------------------------------------------------------------
// CLI

const args = process.argv.slice(2);
const option = (name) => {
	const values = [];
	args.forEach((arg, i) => arg === name && args[i + 1] && values.push(args[i + 1]));
	return values;
};
const workspace = resolve(option('--workspace')[0] ?? process.cwd());
const asJson = args.includes('--json');

// ---------------------------------------------------------------------------
// Source roots

function sourceRoots() {
	const explicit = option('--root');
	if (explicit.length) {
		return explicit.map((r) => resolve(workspace, r));
	}
	const angularJson = join(workspace, 'angular.json');
	if (!existsSync(angularJson)) {
		return [workspace];
	}
	const { projects = {} } = JSON.parse(readFileSync(angularJson, 'utf8'));
	const roots = Object.values(projects).map((p) => resolve(workspace, p.root || p.sourceRoot || 'src'));
	// Keep only outermost roots (a project root may contain another one).
	const unique = [...new Set(roots)].sort();
	return unique.filter((root, i) => !unique.slice(0, i).some((parent) => root.startsWith(parent + '/')));
}

function* walk(dir) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (entry.isDirectory()) {
			if (!IGNORED_DIRS.has(entry.name)) {
				yield* walk(join(dir, entry.name));
			}
		} else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts')) {
			yield join(dir, entry.name);
		}
	}
}

// ---------------------------------------------------------------------------
// Package resolution

const packageDirCache = new Map();
function packageDir(pkg) {
	if (!packageDirCache.has(pkg)) {
		let dir = workspace;
		let found = null;
		while (!found) {
			const candidate = join(dir, 'node_modules', pkg);
			if (existsSync(join(candidate, 'package.json'))) {
				found = candidate;
			} else if (dirname(dir) === dir) {
				break;
			}
			dir = dirname(dir);
		}
		packageDirCache.set(pkg, found);
	}
	return packageDirCache.get(pkg);
}

function splitSpecifier(specifier) {
	const pkg = PACKAGES.find((p) => specifier === p || specifier.startsWith(p + '/'));
	return pkg ? { pkg, subpath: '.' + specifier.slice(pkg.length) } : null;
}

/** Resolves an entrypoint specifier to its { dts, fesm } files, or null. */
function resolveEntrypoint(specifier) {
	const split = splitSpecifier(specifier);
	if (!split) {
		return null;
	}
	const dir = packageDir(split.pkg);
	if (!dir) {
		return null;
	}
	const manifest = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
	const entry = manifest.exports?.[split.subpath];
	if (!entry || typeof entry !== 'object') {
		return null;
	}
	return {
		dts: entry.types && join(dir, entry.types),
		fesm: (entry.default ?? entry.import) && join(dir, entry.default ?? entry.import),
		version: manifest.version,
	};
}

// ---------------------------------------------------------------------------
// .d.ts parsing

const DECLARATION = /^(?:export\s+)?(?:declare\s+)?(?:abstract\s+)?(class|const|let|function|type|interface|enum)\s+([\w$]+)/;
const MEMBER = /^\s+(?:readonly\s+|static\s+|get\s+|set\s+|abstract\s+)*([\w$]+)\s*[?!]?\s*[:(<]/;

function cleanDoc(doc) {
	return doc
		.replace(/^\/\*\*|\*\/$/g, '')
		.split('\n')
		.map((line) => line.replace(/^\s*\*\s?/, '').trim())
		.join(' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function deprecationMessage(doc) {
	const match = cleanDoc(doc).match(/@deprecated\s*(.*?)(?=\s@\w|$)/);
	return match ? match[1] || '(no message)' : null;
}

const dtsCache = new Map();
/**
 * Parses a bundled .d.ts into:
 * - locals: local name → { kind, deprecated, members: [{ name, deprecated }], isNgModule, overloads }
 * - exports: exported name → local name
 * - starReexports: [specifier]
 * - namedReexports: exported name → { specifier, name }
 */
function parseDts(file) {
	if (dtsCache.has(file)) {
		return dtsCache.get(file);
	}
	const text = readFileSync(file, 'utf8');
	const locals = new Map();
	const exportsMap = new Map();
	const starReexports = [];
	const namedReexports = new Map();

	for (const m of text.matchAll(/^export\s+\*\s+from\s+['"]([^'"]+)['"]/gm)) {
		starReexports.push(m[1]);
	}
	for (const m of text.matchAll(/^export\s+(?:type\s+)?\{([^}]*)\}\s*(?:from\s+['"]([^'"]+)['"])?/gm)) {
		for (const part of m[1]
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean)) {
			const [local, exported = local] = part.replace(/^type\s+/, '').split(/\s+as\s+/);
			if (m[2]) {
				namedReexports.set(exported, { specifier: m[2], name: local });
			} else {
				exportsMap.set(exported, local);
			}
		}
	}

	// Walk line by line, keeping the pending JSDoc and the current top-level declaration.
	const lines = text.split('\n');
	let pendingDoc = null;
	let docBuffer = null;
	let current = null;
	for (const line of lines) {
		if (docBuffer !== null) {
			docBuffer += '\n' + line;
			if (line.includes('*/')) {
				pendingDoc = docBuffer;
				docBuffer = null;
			}
			continue;
		}
		if (/^\s*\/\*\*/.test(line)) {
			if (line.includes('*/')) {
				pendingDoc = line;
			} else {
				docBuffer = line;
			}
			continue;
		}
		const decl = line.match(DECLARATION);
		if (decl) {
			const [, kind, name] = decl;
			const deprecated = pendingDoc ? deprecationMessage(pendingDoc) : null;
			const local = locals.get(name) ?? { kind, deprecated: null, members: [], isNgModule: false, overloads: [] };
			if (kind === 'function') {
				local.overloads.push(deprecated);
			} else {
				local.deprecated = local.deprecated ?? deprecated;
			}
			locals.set(name, local);
			current = kind === 'class' || kind === 'interface' ? local : null;
		} else if (current && /^\S/.test(line)) {
			current = null;
		} else if (current) {
			if (line.includes('ɵɵNgModuleDeclaration')) {
				current.isNgModule = true;
			}
			const member = pendingDoc && line.match(MEMBER);
			const message = member && deprecationMessage(pendingDoc);
			if (message) {
				current.members.push({ name: member[1], deprecated: message });
			}
		}
		if (line.trim()) {
			pendingDoc = null;
		}
	}
	for (const local of locals.values()) {
		if (local.kind === 'function') {
			const flagged = local.overloads.filter(Boolean);
			if (flagged.length === local.overloads.length) {
				local.deprecated = flagged[0];
			} else if (flagged.length) {
				local.deprecated = `[some overloads only] ${flagged[0]}`;
			}
		}
	}
	const parsed = { locals, exports: exportsMap, starReexports, namedReexports };
	dtsCache.set(file, parsed);
	return parsed;
}

/** Finds where `name` exported by `specifier` is declared, following re-exports. */
function lookup(specifier, name, seen = new Set()) {
	const key = `${specifier}#${name}`;
	if (seen.has(key)) {
		return null;
	}
	seen.add(key);
	const entry = resolveEntrypoint(specifier);
	if (!entry?.dts || !existsSync(entry.dts)) {
		return null;
	}
	const dts = parseDts(entry.dts);
	if (dts.exports.has(name)) {
		const local = dts.locals.get(dts.exports.get(name));
		return local ? { ...local, localName: dts.exports.get(name), declaredIn: specifier, entry } : null;
	}
	if (dts.namedReexports.has(name)) {
		const target = dts.namedReexports.get(name);
		return lookup(target.specifier, target.name, seen);
	}
	for (const target of dts.starReexports) {
		const found = lookup(target, name, seen);
		if (found) {
			return found;
		}
	}
	return null;
}

// ---------------------------------------------------------------------------
// NgModule injector (ɵinj) in fesm2022

function readInjector(fesmFile, className) {
	if (!fesmFile || !existsSync(fesmFile)) {
		return null;
	}
	const text = readFileSync(fesmFile, 'utf8');
	const typeRe = new RegExp(`^\\s*type:\\s*${className}\\b`);
	for (const m of text.matchAll(/ɵɵngDeclareInjector\(\{/g)) {
		// Extract the object literal by brace matching (it may span several lines).
		const start = m.index + m[0].length - 1;
		let depth = 0;
		let end = start;
		for (; end < text.length; end++) {
			if (text[end] === '{') depth++;
			if (text[end] === '}' && --depth === 0) break;
		}
		const object = text.slice(start + 1, end);
		const typeIndex = object.indexOf('type:');
		if (typeIndex < 0 || !typeRe.test(object.slice(typeIndex))) {
			continue;
		}
		const list = (key) => {
			const keyIndex = object.search(new RegExp(`\\b${key}:\\s*\\[`));
			if (keyIndex < 0) {
				return null;
			}
			let level = 0;
			const open = object.indexOf('[', keyIndex);
			for (let i = open; i < object.length; i++) {
				if (object[i] === '[') level++;
				if (object[i] === ']' && --level === 0) {
					const items = object
						.slice(open + 1, i)
						.split(',')
						.map((s) => s.replace(/\s+/g, ' ').trim())
						.filter(Boolean);
					return [...new Set(items)].join(', ');
				}
			}
			return null;
		};
		return { providers: list('providers'), imports: list('imports') };
	}
	return null;
}

// ---------------------------------------------------------------------------
// Usage context

/** Returns the syntactic context of an identifier occurrence (heuristic, bracket-based). */
function usageContext(text, index) {
	let depth = 0;
	for (let i = index - 1; i >= 0; i--) {
		const c = text[i];
		if (c === ')' || c === ']' || c === '}') {
			depth++;
		} else if (c === '(' || c === '[' || c === '{') {
			if (depth > 0) {
				depth--;
				continue;
			}
			const before = text.slice(Math.max(0, i - 80), i);
			if (c === '(' && /importProvidersFrom\s*$/.test(before)) return 'importProvidersFrom';
			if (c === '[' && /importProvidersFrom\s*\(\s*$/.test(before)) return 'importProvidersFrom';
			if (c === '[' && /providers\s*:\s*$/.test(before)) return 'providers';
			if (c === '[' && /imports\s*:\s*$/.test(before)) {
				const head = text.slice(0, i);
				const owners = [...head.matchAll(/@(Component|NgModule|Directive)\s*\(|configureTestingModule\s*\(/g)];
				const owner = owners.at(-1);
				if (!owner) return 'imports';
				return owner[1] ? `imports of @${owner[1]}` : 'imports of TestBed';
			}
			if (c === '{' || c === '(') {
				continue;
			}
			return 'other';
		}
	}
	return 'other';
}

// ---------------------------------------------------------------------------
// Scan

const IMPORT =
	/import\s+(?:type\s+)?\{([^}]*)\}\s*from\s*['"]((?:@lucca-front\/ng|@lucca-front\/prisme|@lucca\/prisme)(?:\/[^'"]+)?)['"]\s*;?/g;

const roots = sourceRoots();
const findings = new Map(); // `${specifier}#${name}` → finding
const unresolved = new Map();
const versions = {};

for (const root of roots) {
	if (!existsSync(root) || !statSync(root).isDirectory()) {
		continue;
	}
	for (const file of walk(root)) {
		const text = readFileSync(file, 'utf8');
		const imports = [...text.matchAll(IMPORT)];
		if (!imports.length) {
			continue;
		}
		// Blank out import statements so they are not counted as usages.
		let body = text;
		for (const m of imports) {
			body = body.slice(0, m.index) + ' '.repeat(m[0].length) + body.slice(m.index + m[0].length);
		}
		for (const m of imports) {
			const specifier = m[2];
			for (const part of m[1]
				.split(',')
				.map((s) => s.trim())
				.filter(Boolean)) {
				const [imported, alias = imported] = part.replace(/^type\s+/, '').split(/\s+as\s+/);
				const key = `${specifier}#${imported}`;
				const symbol = lookup(specifier, imported);
				if (!symbol) {
					unresolved.set(key, [...(unresolved.get(key) ?? []), relative(workspace, file)]);
					continue;
				}
				versions[splitSpecifier(symbol.declaredIn).pkg] = symbol.entry.version;
				const deprecatedMembers = symbol.members.filter((member) => member.deprecated);
				if (!symbol.deprecated && !deprecatedMembers.length) {
					continue;
				}
				if (!findings.has(key)) {
					findings.set(key, {
						symbol: imported,
						importedFrom: specifier,
						declaredIn: symbol.declaredIn,
						kind: symbol.isNgModule ? 'NgModule' : symbol.kind,
						deprecated: symbol.deprecated,
						deprecatedMembers,
						injector: symbol.isNgModule && symbol.deprecated ? readInjector(symbol.entry.fesm, symbol.localName) : undefined,
						usages: [],
					});
				}
				const finding = findings.get(key);
				const usage = new RegExp(`(?<![\\w$.])${alias.replace(/\$/g, '\\$')}(?![\\w$])`, 'g');
				let count = 0;
				for (const u of body.matchAll(usage)) {
					count++;
					finding.usages.push({
						file: relative(workspace, file),
						line: body.slice(0, u.index).split('\n').length,
						context: usageContext(body, u.index),
					});
				}
				if (!count) {
					finding.usages.push({
						file: relative(workspace, file),
						line: text.slice(0, m.index).split('\n').length,
						context: 'imported but unused',
					});
				}
			}
		}
	}
}

// ---------------------------------------------------------------------------
// Output

const result = {
	workspace,
	roots: roots.map((r) => relative(workspace, r) || '.'),
	versions,
	deprecated: [...findings.values()].filter((f) => f.deprecated),
	deprecatedMembersOnly: [...findings.values()].filter((f) => !f.deprecated),
	unresolved: [...unresolved.entries()].map(([key, files]) => ({ key, files: [...new Set(files)] })),
};

if (asJson) {
	console.log(JSON.stringify(result, null, 2));
	process.exit(0);
}

const out = [];
out.push(`# Deprecated Lucca Front inventory`, '');
out.push(`Workspace: ${workspace}`);
out.push(`Source roots: ${result.roots.join(', ')}`);
out.push(
	`Installed: ${
		Object.entries(versions)
			.map(([p, v]) => `${p}@${v}`)
			.join(', ') || '(none resolved)'
	}`,
	'',
);

out.push(`## Deprecated symbols (${result.deprecated.length})`, '');
for (const f of result.deprecated) {
	const via = f.declaredIn !== f.importedFrom ? ` (declared in ${f.declaredIn})` : '';
	out.push(`### ${f.symbol} — ${f.kind} from ${f.importedFrom}${via}`);
	out.push(`@deprecated ${f.deprecated}`);
	if (f.injector !== undefined) {
		if (!f.injector) {
			out.push(`ɵinj: not found in fesm2022, check manually`);
		} else {
			out.push(`ɵinj providers: ${f.injector.providers ?? 'none'}`);
			out.push(`ɵinj imports (their providers are inherited too): ${f.injector.imports ?? 'none'}`);
		}
	}
	for (const u of f.usages) {
		out.push(`- ${u.file}:${u.line} — ${u.context}`);
	}
	out.push('');
}

out.push(`## Non-deprecated symbols with deprecated members (${result.deprecatedMembersOnly.length})`, '');
out.push('Check templates and code for these inputs/properties/methods.', '');
for (const f of result.deprecatedMembersOnly) {
	out.push(`### ${f.symbol} — ${f.importedFrom}`);
	for (const m of f.deprecatedMembers) {
		out.push(`- \`${m.name}\`: ${m.deprecated}`);
	}
	const files = [...new Set(f.usages.map((u) => u.file))];
	const more = files.length > 5 ? ` … +${files.length - 5} (see --json)` : '';
	out.push(`Imported in ${files.length} file(s): ${files.slice(0, 5).join(', ')}${more}`, '');
}

if (result.unresolved.length) {
	out.push(`## Unresolved imports (${result.unresolved.length})`, '');
	out.push('Not found in the installed .d.ts (missing package, private symbol, or parser limit): check manually.', '');
	for (const u of result.unresolved) {
		out.push(`- ${u.key} — ${u.files.join(', ')}`);
	}
}

console.log(out.join('\n'));
