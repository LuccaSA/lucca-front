/**
 * Build-time step (offline, no token): turns the public API of `@lucca-front/ng` —
 * resolved from the TypeScript compiler API (see `extract-api.mjs`) — into two
 * deterministic, machine-readable artifacts:
 *
 *   - .storybook/public/llms-full.txt   — a single LLM-consumable Markdown surface
 *     (every public component/directive/pipe/injectable/interface/type/function
 *     with its inputs, outputs, methods and JSDoc description).
 *   - .storybook/public/deprecations.json — a manifest of every symbol marked with
 *     the JSDoc `@deprecated` tag (type, message, replacement hint) for downstream
 *     tooling (e.g. a lint rule).
 *
 * Both files land in .storybook/public/, which Storybook copies verbatim into
 * storybook-static/ (main.ts `staticDirs: ['./public']`) and the docs deploy syncs
 * to R2 — so they ship at <docs-domain>/<ref>/storybook/{llms-full.txt,deprecations.json}.
 * Generated on every docs build — no hand-maintained API tables, one source of truth
 * (the code's JSDoc).
 *
 * Determinism contract: the public surface is resolved from the entry-point barrels,
 * entities and their members are alpha-sorted, descriptions come from the raw JSDoc,
 * and nothing volatile (dates, absolute paths, line numbers) reaches the output —
 * same code in, byte-identical output out.
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createProject, extractLibraries } from './extract-api.mjs';

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptsDir, '..', '..');

/** Public-API library metadata. Single npm package, resolved from its entry-point barrels. */
export const NG_PACKAGE = '@lucca-front/ng';
/** Directory holding the secondary entry points (each `<name>/public-api.ts`). */
const NG_ROOT = 'packages/ng';
/** Generated artifacts (gitignored; shipped via Storybook staticDirs). */
export const OUT_LLMS = '.storybook/public/llms-full.txt';
export const OUT_DEPRECATIONS = '.storybook/public/deprecations.json';

// ---------------------------------------------------------------------------
// Entry-point discovery
// ---------------------------------------------------------------------------

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
 * The secondary entry-point barrels of `@lucca-front/ng`: every `public-api.ts`
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

/**
 * Extract and merge the whole `@lucca-front/ng` public surface from its entry-point
 * barrels, via the ts-morph front-end. Shared by generation and the coverage gate so
 * both measure the identical surface.
 * @param {string} root
 * @returns {{ doc: Record<string, any>, names: Set<string> }}
 */
export function extractSurface(root = workspaceRoot) {
	const project = createProject(root);
	return extractLibraries(project, findEntryBarrels(root));
}

// ---------------------------------------------------------------------------
// Entity indexing & text cleaning
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

/** Strip HTML tags and unescape HTML entities — applied to prose segments only. */
function stripHtml(prose) {
	return prose
		.replace(/<\/?[^>]+>/g, '')
		.replace(/&#39;/g, "'")
		.replace(/&quot;/g, '"')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>');
}

/**
 * Normalise a raw JSDoc description for Markdown: reduce `{@link X}` to `X`, strip
 * any HTML tags and unescape HTML entities. The HTML strip runs on prose only — code
 * spans and fenced blocks are preserved verbatim, so angle-bracket content inside
 * them survives.
 * @param {string | null | undefined} raw
 * @returns {string}
 */
function decodeText(raw) {
	const text = String(raw ?? '').replace(/\{@link\s+([^}]+)\}/g, '$1');
	return text.replace(/(```[\s\S]*?```|`[^`]*`)|([^`]+)/g, (_m, code, prose) => code ?? stripHtml(prose));
}

/**
 * Keep only the description summary: cut at the first JSDoc block tag (`@example`,
 * `@default`, `@param`, …) or the first fenced code block. Examples and tag values
 * live in the prose guides and dedicated columns — the API reference stays concise.
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
 * Safe single-line table text: summary only, whitespace collapsed, pipes escaped so
 * a description can never break the Markdown table.
 * @param {string | null | undefined} raw
 * @returns {string}
 */
export function cleanCell(raw) {
	return summaryOnly(decodeText(raw)).replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim();
}

/**
 * Multi-line description for prose blocks (not tables): summary only, blank lines
 * collapsed but paragraph breaks kept.
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

/**
 * Type-parameter suffix (`<TId>`, `<T, K extends EntityId>`) from the entity's
 * `typeParameters`. Only ever emitted inside a ```ts code fence.
 * @param {any} entity
 * @returns {string}
 */
function typeParamSuffix(entity) {
	return entity.typeParameters?.length ? `<${entity.typeParameters.join(', ')}>` : '';
}

/**
 * Deprecation callout from the entity's structured `@deprecated` metadata. `summaryOnly`
 * cuts descriptions at `@deprecated`, so without this the warning and its migration
 * target never reach the reader. Rendered as a blockquote right under the heading.
 * @param {any} entity
 * @returns {string[]} block lines (empty when the entity is not deprecated)
 */
function deprecationBlock(entity) {
	if (!entity.deprecated) return [];
	const message = decodeText(entity.deprecationMessage).trim();
	const quoted = (message ? `**Deprecated.** ${message}` : '**Deprecated.**')
		.split('\n')
		.map((l) => `> ${l}`.trimEnd())
		.join('\n');
	return [quoted, ''];
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

/**
 * The meaningful callable surface: non-lifecycle methods, alpha-sorted. Visibility is
 * already resolved from the AST by the extractor (only public methods reach here).
 * @param {any[] | undefined} methods
 */
function publicMethods(methods) {
	return (methods || []).filter((m) => m?.name && !NG_LIFECYCLE.has(m.name)).sort((a, b) => a.name.localeCompare(b.name));
}

/** Members carrying a name, alpha-sorted. */
function sortedByName(arr) {
	return [...(arr || [])].filter((x) => x?.name).sort((a, b) => a.name.localeCompare(b.name));
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
	const lines = [`## ${entity.name}`, '', ...deprecationBlock(entity)];
	const desc = cleanBlock(entity.rawdescription || entity.description);
	if (desc) lines.push(desc, '');
	if (entity.selector) lines.push(`**Selector:** \`${entity.selector}\``, '');

	const inputs = sortedByName(entity.inputsClass);
	if (inputs.length) {
		lines.push('### Inputs', '', '| Input | Type | Default | Required | Description |', '| --- | --- | --- | --- | --- |');
		for (const i of inputs) {
			lines.push(
				`| \`${i.name}\` | ${typeCell(i.type)} | ${defaultCell(i.defaultValue)} | ${i.required ? 'yes' : 'no'} | ${cleanCell(i.rawdescription || i.description)} |`,
			);
		}
		lines.push('');
	}

	const outputs = sortedByName(entity.outputsClass);
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
	const lines = [`## ${entity.name}()`, '', ...deprecationBlock(entity)];
	const desc = cleanBlock(entity.rawdescription || entity.description);
	if (desc) lines.push(desc, '');
	// A function carries one entry per overload signature; the legacy single-signature
	// shape is the one-element fallback.
	const signatures = entity.signatures ?? [{ typeParameters: entity.typeParameters, args: entity.args, returnType: entity.returnType }];
	lines.push('```ts');
	for (const sig of signatures) {
		const args = (sig.args || []).map((a) => `${a.name}: ${a.type || 'unknown'}`).join(', ');
		lines.push(`function ${entity.name}${typeParamSuffix(sig)}(${args}): ${sig.returnType || 'void'}`);
	}
	lines.push('```', '');
	return lines.join('\n');
}

/** @param {any} entry */
export function renderInterface({ entity }) {
	const lines = [`## ${entity.name}`, '', ...deprecationBlock(entity)];
	const desc = cleanBlock(entity.rawdescription || entity.description);
	if (desc) lines.push(desc, '');
	const suffix = typeParamSuffix(entity);
	if (suffix) lines.push('```ts', `interface ${entity.name}${suffix}`, '```', '');
	const props = sortedByName(entity.properties);
	if (props.length) {
		lines.push('| Property | Type | Description |', '| --- | --- | --- |');
		for (const p of props) {
			// Mirror the TypeScript modifier order so a readonly property does not read as reassignable.
			const base = p.readonly ? `readonly ${p.name}` : p.name;
			const name = p.optional ? `${base}?` : base;
			lines.push(`| \`${name}\` | ${typeCell(p.type)} | ${cleanCell(p.rawdescription || p.description)} |`);
		}
		lines.push('');
	}
	return lines.join('\n');
}

/** @param {any} entry */
export function renderTypeAlias({ entity }) {
	const suffix = typeParamSuffix(entity);
	const lines = [`## ${entity.name}`, '', ...deprecationBlock(entity)];
	const desc = cleanBlock(entity.rawdescription || entity.description);
	if (desc) lines.push(desc, '');
	if (entity.rawtype && entity.rawtype !== 'unknown') {
		lines.push('```ts', `type ${entity.name}${suffix} = ${entity.rawtype}`, '```', '');
	} else if (suffix) {
		lines.push('```ts', `type ${entity.name}${suffix}`, '```', '');
	}
	return lines.join('\n');
}

/** @param {any} entry */
export function renderEnumeration({ entity }) {
	const lines = [`## ${entity.name}`, '', ...deprecationBlock(entity)];
	const desc = cleanBlock(entity.rawdescription || entity.description);
	if (desc) lines.push(desc, '');
	const members = sortedByName(entity.childs || entity.members);
	if (members.length) {
		lines.push('| Member | Value |', '| --- | --- |');
		for (const m of members) lines.push(`| \`${m.name}\` | ${m.value != null ? `\`${m.value}\`` : '—'} |`);
		lines.push('');
	}
	return lines.join('\n');
}

/** @param {any} entry — top-level `const` exports such as InjectionTokens. */
export function renderVariable({ entity }) {
	const lines = [`## ${entity.name}`, '', ...deprecationBlock(entity)];
	const desc = cleanBlock(entity.rawdescription || entity.description);
	if (desc) lines.push(desc, '');
	if (entity.type) lines.push('```ts', `const ${entity.name}: ${entity.type}`, '```', '');
	return lines.join('\n');
}

export const RENDERERS = {
	component: renderComponentOrDirective,
	directive: renderComponentOrDirective,
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
 * Select the public API (barrel-exported names found in the extraction), alpha-sorted
 * and dispatched to renderers. Names not present in the extraction (values with no
 * own doc node) are returned as `unmatched`.
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
 * extraction (e.g. re-exported values with no own doc node) are excluded from the
 * denominator — coverage measures "an extracted public symbol is undocumented".
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

/** A symbol's deprecation, from the extractor's `deprecated`/`deprecationMessage`, or null. */
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
	scan(doc.injectables, 'injectable');
	scan(doc.classes, 'class');
	scan(doc.interfaces, 'interface');
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
 * Render the single llms-full.txt surface. Deterministic: identical inputs produce
 * byte-identical output.
 * @param {{ matched: any[] }} api
 * @returns {string}
 */
export function renderLlmsFull(api) {
	const header =
		`# ${NG_PACKAGE} — LLM API reference\n\n` +
		`Auto-generated public API surface of ${NG_PACKAGE}, resolved from the library's\n` +
		`TypeScript source and JSDoc (via the compiler API) and rendered deterministically.\n` +
		`Do not edit by hand — edit the source code's JSDoc. Regenerated on every docs build.\n\n` +
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
 * @param {{ root?: string }} [opts]
 */
export function generateAll({ root = workspaceRoot } = {}) {
	const { doc, names } = extractSurface(root);
	const api = selectPublicApi(doc, names);
	const deprecations = collectDeprecations(doc, names);

	const llmsAbs = resolve(root, OUT_LLMS);
	mkdirSync(dirname(llmsAbs), { recursive: true });
	writeFileSync(llmsAbs, renderLlmsFull(api));

	const depAbs = resolve(root, OUT_DEPRECATIONS);
	mkdirSync(dirname(depAbs), { recursive: true });
	writeFileSync(depAbs, renderDeprecations(deprecations));

	return {
		exported: names.size,
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
