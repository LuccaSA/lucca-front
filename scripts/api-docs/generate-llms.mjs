/**
 * Build-time step (offline, no token): transforms the Compodoc extraction
 * (.storybook/documentation.json — see `npm run docs:api-json`) into two
 * deterministic, machine-readable artifacts describing the public API of
 * @lucca-front/ng:
 *
 *   - .storybook/public/llms-full.txt   — a single LLM-consumable Markdown
 *     surface (every public component/directive/pipe/injectable/interface/type/
 *     function with its inputs, outputs, methods and JSDoc description).
 *   - .storybook/public/deprecations.json — a manifest of every symbol marked
 *     with the JSDoc deprecation tag (type, message, replacement hint) for
 *     downstream tooling.
 *
 * Both files land in .storybook/public/, which Storybook copies verbatim into
 * storybook-static/ (staticDirs: ['./public']) and the docs deploy syncs to R2,
 * so they ship at <docs-domain>/<ref>/storybook/{llms-full.txt,deprecations.json}.
 * They are generated on every docs build — no hand-maintained API tables, one
 * source of truth (the code's JSDoc).
 *
 * Determinism contract: the public surface is resolved from the entry-point
 * barrels, entities and their members are alpha-sorted, descriptions come from
 * the raw JSDoc, and nothing volatile (dates, absolute paths, line numbers)
 * reaches the output — same code in, byte-identical output out.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptsDir, '..', '..');

/** Public-API library metadata. Single npm package, resolved from its entry-point barrels. */
export const NG_PACKAGE = '@lucca-front/ng';
/** Directory holding the secondary entry points (each `<name>/public-api.ts`). */
const NG_ROOT = 'packages/ng';
/** Compodoc JSON extraction path (gitignored build artifact). */
export const DOC_PATH = '.storybook/documentation.json';
/** Generated artifacts (gitignored; shipped via Storybook staticDirs). */
export const OUT_LLMS = '.storybook/public/llms-full.txt';
export const OUT_DEPRECATIONS = '.storybook/public/deprecations.json';

// ---------------------------------------------------------------------------
// Public-surface resolution (export-* graph)
// ---------------------------------------------------------------------------

/**
 * Collect the identifiers a module *declares* or re-exports by name. Covers
 * `export { A, type B as C }` and `export const|function|class|type|interface|enum X`.
 * Does NOT follow `export * from` (that is walked separately, recursively).
 * @param {string} source
 * @returns {Set<string>}
 */
export function parseExportedNames(source) {
	const names = new Set();
	for (const m of source.matchAll(/export\s*(?:type\s*)?\{([^}]*)\}/g)) {
		for (let part of m[1].split(',')) {
			part = part.trim().replace(/^type\s+/, '');
			if (!part) continue;
			const name = part
				.split(/\s+as\s+/)
				.pop()
				.trim();
			if (name) names.add(name);
		}
	}
	for (const m of source.matchAll(/export\s+(?:const|function|class|type|interface|enum)\s+([A-Za-z0-9_$]+)/g)) {
		names.add(m[1]);
	}
	return names;
}

/** Recursively collect files named `filename` under `dir` (skips node_modules/dist). */
function walkFor(dir, filename, out) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (entry.isDirectory()) {
			if (entry.name === 'node_modules' || entry.name === 'dist') continue;
			walkFor(join(dir, entry.name), filename, out);
		} else if (entry.name === filename) {
			out.push(join(dir, entry.name));
		}
	}
}

/**
 * The secondary entry-point barrels of @lucca-front/ng: every `public-api.ts`
 * sitting next to an `ng-package.json` (the root ng-package.json's primary
 * `public_api.ts` deliberately exports nothing and is skipped). Alpha-sorted.
 * @param {string} root
 * @returns {string[]}
 */
export function findEntryBarrels(root = workspaceRoot) {
	const ngDir = resolve(root, NG_ROOT);
	const pkgs = [];
	walkFor(ngDir, 'ng-package.json', pkgs);
	const rootPkg = resolve(ngDir, 'ng-package.json');
	return pkgs
		.filter((p) => resolve(p) !== rootPkg)
		.map((p) => join(dirname(p), 'public-api.ts'))
		.filter((p) => existsSync(p))
		.sort((a, b) => a.localeCompare(b));
}

/** Resolve a relative module specifier to an existing `.ts` file (bare, /index, /public-api). */
export function resolveRelativeTs(fromFile, spec) {
	const base = resolve(dirname(fromFile), spec);
	for (const candidate of [`${base}.ts`, join(base, 'index.ts'), join(base, 'public-api.ts')]) {
		if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
	}
	return undefined;
}

/**
 * Names exported (transitively) from a barrel file: its own declarations and
 * `export { ... }` re-exports, plus everything reached through `export * from
 * './local'`. External wildcard re-exports (e.g. `export * from '@lucca/prisme/button'`)
 * are out of the packages/ng extraction scope and skipped. `seen` guards cycles.
 * @param {string} file
 * @param {{ seen?: Set<string>, resolve?: (from: string, spec: string) => string | undefined }} [opts]
 * @returns {Set<string>}
 */
export function collectExportedNames(file, opts = {}) {
	const { seen = new Set(), resolve: resolveModule = resolveRelativeTs } = opts;
	const abs = resolve(file);
	if (seen.has(abs) || !existsSync(abs)) return new Set();
	seen.add(abs);
	const source = readFileSync(abs, 'utf8');
	const names = parseExportedNames(source);
	for (const m of source.matchAll(/export\s*\*\s*from\s*['"]([^'"]+)['"]/g)) {
		const spec = m[1];
		if (!spec.startsWith('.')) continue; // external package — outside packages/ng scope
		const target = resolveModule(abs, spec);
		if (target) for (const name of collectExportedNames(target, { seen, resolve: resolveModule })) names.add(name);
	}
	return names;
}

/**
 * The full public API surface of @lucca-front/ng: the union of the names
 * reachable from every secondary entry-point barrel.
 * @param {string} root
 * @returns {Set<string>}
 */
export function collectPublicSurface(root = workspaceRoot) {
	const seen = new Set();
	const names = new Set();
	for (const barrel of findEntryBarrels(root)) {
		for (const name of collectExportedNames(barrel, { seen })) names.add(name);
	}
	return names;
}

// ---------------------------------------------------------------------------
// Entity indexing & text cleaning (ported from the Pagga.Front reference)
// ---------------------------------------------------------------------------

/**
 * Index every documented entity by name, tagging its kind so the renderer can
 * dispatch. First writer wins to keep lookups stable.
 * @param {Record<string, any>} doc
 * @returns {Map<string, { kind: string, entity: any }>}
 */
export function indexEntities(doc) {
	const map = new Map();
	const add = (arr, kind) => {
		for (const entity of arr || []) {
			if (entity?.name && !map.has(entity.name)) map.set(entity.name, { kind, entity });
		}
	};
	add(doc.components, 'component');
	add(doc.directives, 'directive');
	add(doc.pipes, 'pipe');
	add(doc.injectables, 'injectable');
	add(doc.interfaces, 'interface');
	add(doc.classes, 'class');
	const misc = doc.miscellaneous || {};
	add(misc.functions, 'function');
	add(misc.typealiases, 'typealias');
	add(misc.enumerations, 'enumeration');
	add(misc.variables, 'variable');
	return map;
}

/**
 * Decode a Compodoc description: undo its blank-line placeholder, drop {@link},
 * strip HTML tags, unescape entities. Leaves the raw JSDoc text otherwise intact.
 * @param {string | null | undefined} raw
 * @returns {string}
 */
function decodeText(raw) {
	return String(raw ?? '')
		.replace(/___COMPODOC_EMPTY_LINE___/g, '\n')
		.replace(/\{@link\s+([^}]+)\}/g, '$1')
		.replace(/<\/?[^>]+>/g, '')
		.replace(/&#39;/g, "'")
		.replace(/&quot;/g, '"')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>');
}

/**
 * Keep only the description summary: cut at the first JSDoc block tag or fenced
 * code block. Examples and tag values live in the prose docs — the reference
 * stays concise.
 * @param {string} text
 * @returns {string}
 */
function summaryOnly(text) {
	let cut = text.length;
	const tag = text.search(/(?<!`)@(example|default|param|returns?|see|deprecated|throws|remarks|template|typeParam|internal)\b/);
	if (tag !== -1) cut = Math.min(cut, tag);
	const fence = text.indexOf('```');
	if (fence !== -1) cut = Math.min(cut, fence);
	return text.slice(0, cut);
}

/**
 * Safe single-line table text: summary only, whitespace collapsed, pipes escaped.
 * @param {string | null | undefined} raw
 * @returns {string}
 */
export function cleanCell(raw) {
	return summaryOnly(decodeText(raw)).replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim();
}

/**
 * Multi-line description for prose blocks: summary only, blank lines collapsed
 * but paragraph breaks kept.
 * @param {string | null | undefined} raw
 * @returns {string}
 */
export function cleanBlock(raw) {
	return summaryOnly(decodeText(raw))
		.split('\n')
		.map((l) => l.trim())
		.join('\n')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

/** Public, non-lifecycle instance methods only — the meaningful callable surface. */
const NG_LIFECYCLE = new Set([
	'ngOnInit',
	'ngOnChanges',
	'ngOnDestroy',
	'ngDoCheck',
	'ngAfterContentInit',
	'ngAfterContentChecked',
	'ngAfterViewInit',
	'ngAfterViewChecked',
]);

/** @param {any[] | undefined} methods */
function publicMethods(methods) {
	return (methods || [])
		.filter((m) => !NG_LIFECYCLE.has(m.name))
		.filter((m) => {
			const mods = m.modifierKind || [];
			// 123 = private, 124 = protected in the TS SyntaxKind Compodoc emits.
			return !mods.includes(123) && !mods.includes(124);
		})
		.sort((a, b) => a.name.localeCompare(b.name));
}

/** @param {string | undefined} type */
function typeCell(type) {
	return type ? `\`${type.replace(/\|/g, '\\|')}\`` : '—';
}
/** @param {string | undefined} value */
function defaultCell(value) {
	return value != null && value !== '' ? `\`${String(value).replace(/\|/g, '\\|')}\`` : '—';
}

// ---------------------------------------------------------------------------
// Renderers (one Markdown section per entity)
// ---------------------------------------------------------------------------

/** @param {any} entry */
export function renderComponentOrDirective({ entity }) {
	const lines = [`## ${entity.name}`, ''];
	const desc = cleanBlock(entity.rawdescription || entity.description);
	if (desc) lines.push(desc, '');
	if (entity.selector) lines.push(`**Selector:** \`${entity.selector}\``, '');

	const inputs = [...(entity.inputsClass || [])].sort((a, b) => a.name.localeCompare(b.name));
	if (inputs.length) {
		lines.push('### Inputs', '', '| Input | Type | Default | Required | Description |', '| --- | --- | --- | --- | --- |');
		for (const i of inputs) {
			lines.push(
				`| \`${i.name}\` | ${typeCell(i.type)} | ${defaultCell(i.defaultValue)} | ${i.required ? 'yes' : 'no'} | ${cleanCell(i.rawdescription || i.description)} |`,
			);
		}
		lines.push('');
	}

	const outputs = [...(entity.outputsClass || [])].sort((a, b) => a.name.localeCompare(b.name));
	if (outputs.length) {
		lines.push('### Outputs', '', '| Output | Type | Description |', '| --- | --- | --- |');
		for (const o of outputs) {
			lines.push(`| \`${o.name}\` | ${typeCell(o.type)} | ${cleanCell(o.rawdescription || o.description)} |`);
		}
		lines.push('');
	}

	const methods = publicMethods(entity.methodsClass);
	if (methods.length) {
		lines.push('### Methods', '', '| Method | Returns | Description |', '| --- | --- | --- |');
		for (const m of methods) {
			const args = (m.args || []).map((a) => `${a.name}: ${a.type || 'unknown'}`).join(', ');
			lines.push(`| \`${m.name}(${args})\` | ${typeCell(m.returnType)} | ${cleanCell(m.rawdescription || m.description)} |`);
		}
		lines.push('');
	}
	return lines.join('\n');
}

/** @param {any} entry */
export function renderFunction({ entity }) {
	const lines = [`## ${entity.name}()`, ''];
	const desc = cleanBlock(entity.rawdescription || entity.description);
	if (desc) lines.push(desc, '');
	const typeParams = entity.typeParameters?.length ? `<${entity.typeParameters.join(', ')}>` : '';
	const args = (entity.args || []).map((a) => `${a.name}: ${a.type || 'unknown'}`).join(', ');
	lines.push('```ts', `function ${entity.name}${typeParams}(${args}): ${entity.returnType || 'void'}`, '```', '');
	return lines.join('\n');
}

/** @param {any} entry */
export function renderInterface({ entity }) {
	const lines = [`## ${entity.name}`, ''];
	const desc = cleanBlock(entity.rawdescription || entity.description);
	if (desc) lines.push(desc, '');
	const props = [...(entity.properties || [])].sort((a, b) => a.name.localeCompare(b.name));
	if (props.length) {
		lines.push('| Property | Type | Description |', '| --- | --- | --- |');
		for (const p of props) {
			const name = p.optional ? `${p.name}?` : p.name;
			lines.push(`| \`${name}\` | ${typeCell(p.type)} | ${cleanCell(p.rawdescription || p.description)} |`);
		}
		lines.push('');
	}
	return lines.join('\n');
}

/** @param {any} entry */
export function renderTypeAlias({ entity }) {
	const lines = [`## ${entity.name}`, ''];
	const desc = cleanBlock(entity.rawdescription || entity.description);
	if (desc) lines.push(desc, '');
	if (entity.rawtype && entity.rawtype !== 'unknown') {
		lines.push('```ts', `type ${entity.name} = ${entity.rawtype}`, '```', '');
	}
	return lines.join('\n');
}

/** @param {any} entry */
export function renderEnumeration({ entity }) {
	const lines = [`## ${entity.name}`, ''];
	const desc = cleanBlock(entity.rawdescription || entity.description);
	if (desc) lines.push(desc, '');
	const members = [...(entity.childs || entity.members || [])].sort((a, b) => a.name.localeCompare(b.name));
	if (members.length) {
		lines.push('| Member | Value |', '| --- | --- |');
		for (const m of members) lines.push(`| \`${m.name}\` | ${m.value != null ? `\`${m.value}\`` : '—'} |`);
		lines.push('');
	}
	return lines.join('\n');
}

/** @param {any} entry — top-level `const` exports such as InjectionTokens. */
export function renderVariable({ entity }) {
	const lines = [`## ${entity.name}`, ''];
	const desc = cleanBlock(entity.rawdescription || entity.description);
	if (desc) lines.push(desc, '');
	if (entity.type) lines.push('```ts', `const ${entity.name}: ${entity.type}`, '```', '');
	return lines.join('\n');
}

export const RENDERERS = {
	component: renderComponentOrDirective,
	directive: renderComponentOrDirective,
	pipe: renderComponentOrDirective,
	injectable: renderComponentOrDirective,
	class: renderComponentOrDirective,
	function: renderFunction,
	interface: renderInterface,
	typealias: renderTypeAlias,
	enumeration: renderEnumeration,
	variable: renderVariable,
};

// ---------------------------------------------------------------------------
// Public-API selection, coverage & deprecations
// ---------------------------------------------------------------------------

/**
 * Select the public API (barrel-exported names found in the extraction),
 * alpha-sorted and dispatched to renderers. Names not present in the extraction
 * (e.g. re-exported from an external package, or values with no doc node) are
 * returned as `unmatched`.
 * @param {Record<string, any>} doc
 * @param {Set<string>} exportedNames
 */
export function selectPublicApi(doc, exportedNames) {
	const entities = indexEntities(doc);
	const matched = [];
	const unmatched = [];
	for (const name of [...exportedNames].sort((a, b) => a.localeCompare(b))) {
		const found = entities.get(name);
		if (found && RENDERERS[found.kind]) matched.push({ name, ...found });
		else unmatched.push(name);
	}
	return { matched, unmatched };
}

/**
 * Public-API documentation coverage: the share of barrel exports present in the
 * extraction that carry a non-empty JSDoc description. Names absent from the
 * extraction (external re-exports) are excluded from the denominator — they are
 * documented in their own package, not here.
 * @param {Record<string, any>} doc
 * @param {Set<string>} exportedNames
 * @returns {{ total: number, documented: number, coverage: number, missing: string[], external: string[] }}
 */
export function coverageReport(doc, exportedNames) {
	const entities = indexEntities(doc);
	const names = [...exportedNames].sort((a, b) => a.localeCompare(b));
	const missing = [];
	const external = [];
	let total = 0;
	let documented = 0;
	for (const name of names) {
		const found = entities.get(name);
		if (!found) {
			external.push(name);
			continue;
		}
		total++;
		const desc = found.entity.rawdescription || found.entity.description;
		if (desc && String(desc).trim()) documented++;
		else missing.push(name);
	}
	return {
		total,
		documented,
		coverage: total ? Math.round((documented / total) * 100) : 100,
		missing,
		external,
	};
}

/** Extract a replacement symbol from a deprecation message ("use `X` instead"). */
export function replacementFrom(message) {
	const m = String(message || '').match(/`([^`]+)`/);
	return m ? m[1] : null;
}

/** A symbol's deprecation, from Compodoc's `deprecated`/`deprecationMessage`, or null. */
function deprecationOf(node) {
	if (!node?.deprecated) return null;
	const message = decodeText(node.deprecationMessage).replace(/\s+/g, ' ').trim();
	return { message, replacement: replacementFrom(message) };
}

/**
 * Every symbol the extraction marks as deprecated — top-level entities and their
 * members (inputs, outputs, methods, properties) — as a deterministic manifest.
 * Alpha-sorted by symbol; a member reads as `Owner.member`.
 * @param {Record<string, any>} doc
 * @param {Set<string>} publicNames
 * @returns {Array<{ symbol: string, type: string, public: boolean, message: string, replacement: string | null }>}
 */
export function collectDeprecations(doc, publicNames = new Set()) {
	const out = [];
	const push = (symbol, type, isPublic, dep) =>
		out.push({ symbol, type, public: isPublic, message: dep.message, replacement: dep.replacement });

	const scan = (arr, type) => {
		for (const entity of arr || []) {
			const isPublic = publicNames.has(entity.name);
			const entityDep = deprecationOf(entity);
			if (entityDep) push(entity.name, type, isPublic, entityDep);
			const members = [
				['inputsClass', 'input'],
				['outputsClass', 'output'],
				['methodsClass', 'method'],
				['propertiesClass', 'property'],
				['properties', 'property'],
			];
			for (const [key, memberType] of members) {
				for (const member of entity[key] || []) {
					const memberDep = deprecationOf(member);
					if (memberDep) push(`${entity.name}.${member.name}`, memberType, isPublic, memberDep);
				}
			}
		}
	};

	scan(doc.components, 'component');
	scan(doc.directives, 'directive');
	scan(doc.pipes, 'pipe');
	scan(doc.injectables, 'injectable');
	scan(doc.classes, 'class');
	scan(doc.interfaces, 'interface');
	scan(doc.modules, 'module');
	scan(doc.guards, 'guard');
	scan(doc.interceptors, 'interceptor');
	const misc = doc.miscellaneous || {};
	scan(misc.functions, 'function');
	scan(misc.variables, 'variable');
	scan(misc.typealiases, 'typealias');
	scan(misc.enumerations, 'enumeration');

	return out.sort((a, b) => a.symbol.localeCompare(b.symbol) || a.type.localeCompare(b.type));
}

// ---------------------------------------------------------------------------
// Rendering the artifacts
// ---------------------------------------------------------------------------

/**
 * Render the single llms-full.txt surface. Deterministic: identical inputs
 * produce byte-identical output.
 * @param {{ matched: any[] }} api
 * @returns {string}
 */
export function renderLlmsFull(api) {
	const header =
		`# ${NG_PACKAGE} — LLM API reference\n\n` +
		`Auto-generated public API surface of ${NG_PACKAGE}, extracted from the library's\n` +
		`JSDoc by Compodoc and rendered deterministically. Do not edit by hand — edit the\n` +
		`source code's JSDoc. Regenerated on every docs build.\n\n` +
		`Public API entries: ${api.matched.length}\n`;
	const body = api.matched.map((e) => RENDERERS[e.kind](e).trimEnd()).join('\n\n');
	return `${header}\n${body}\n`;
}

/**
 * Render the deprecations.json manifest. Deterministic (sorted, no volatile data).
 * @param {ReturnType<typeof collectDeprecations>} deprecations
 * @returns {string}
 */
export function renderDeprecations(deprecations) {
	return `${JSON.stringify({ package: NG_PACKAGE, count: deprecations.length, deprecations }, null, 2)}\n`;
}

/**
 * Generate both artifacts from the extraction. Returns a summary for the CLI.
 * @param {{ docPath?: string, root?: string }} [opts]
 */
export function generateAll({ docPath, root = workspaceRoot } = {}) {
	const doc = JSON.parse(readFileSync(docPath ?? resolve(root, DOC_PATH), 'utf8'));
	const publicNames = collectPublicSurface(root);
	const api = selectPublicApi(doc, publicNames);
	const deprecations = collectDeprecations(doc, publicNames);

	const llmsAbs = resolve(root, OUT_LLMS);
	mkdirSync(dirname(llmsAbs), { recursive: true });
	writeFileSync(llmsAbs, renderLlmsFull(api));

	const depAbs = resolve(root, OUT_DEPRECATIONS);
	mkdirSync(dirname(depAbs), { recursive: true });
	writeFileSync(depAbs, renderDeprecations(deprecations));

	return {
		exported: publicNames.size,
		documented: api.matched.length,
		unmatched: api.unmatched.length,
		deprecations: deprecations.length,
	};
}

// Run when invoked directly (not when imported by tests).
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	const s = generateAll();
	console.log(
		`[llms] ${s.documented}/${s.exported} public exports rendered to ${OUT_LLMS} ` +
			`(${s.unmatched} names not in the packages/ng extraction), ` +
			`${s.deprecations} deprecations written to ${OUT_DEPRECATIONS}.`,
	);
}
