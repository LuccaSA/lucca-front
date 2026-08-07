/**
 * Generates the CSS API manifest shipped inside `@lucca-front/scss`.
 *
 * A VS Code extension reads this manifest from a consumer's node_modules to
 * offer version-accurate autocomplete / hover / diagnostics for the library's
 * CSS custom properties and `pr-u-*` utility classes.
 *
 * Strategy: compile the full SCSS surface (all product palettes, deprecated
 * `u-*` prefix, cursive font) to expanded CSS, then walk it with PostCSS to
 * enumerate the public custom properties and utility classes. Component-scoped
 * custom properties (`--components-*` / `--component-*`) are excluded: they are
 * internal implementation, not consumer API.
 *
 * Uses only dependencies already present at the repo root (sass, postcss,
 * postcss-value-parser). No new dependencies.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const sass = require('sass');
const postcss = require('postcss');
const valueParser = require('postcss-value-parser');

const { isDeprecatedVariable, classDeprecation } = require('./deprecations');

const MANIFEST_VERSION = 1;
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const NODE_MODULES = path.join(REPO_ROOT, 'node_modules');

/** Source folder holding the consumer-facing `@mixin` definitions. */
const UTILS_DIR = path.join(REPO_ROOT, 'packages', 'scss', 'src', 'commons', 'utils');
/** Import-path prefix a consumer writes to `@use` a util module. */
const MIXIN_IMPORT_BASE = '@lucca-front/scss/src/commons/utils';
/** Util files that expose only internal/plumbing mixins — excluded from the public surface. */
const EXCLUDED_MIXIN_FILES = new Set(['index', 'namespace', 'highlight-prisme']);

/**
 * Public custom-property prefixes we expose. `--components-*` / `--component-*`
 * are deliberately absent (internal implementation, not consumer API).
 */
const VARIABLE_CATEGORIES = [
	{ prefix: '--pr-t-', category: 'token' },
	{ prefix: '--palettes-', category: 'palette' },
	{ prefix: '--breakpoints-', category: 'breakpoint' },
	{ prefix: '--commons-', category: 'commons' },
	{ prefix: '--colors-', category: 'commons' }, // deprecated, still public surface
	{ prefix: '--sizes-', category: 'commons' }, // deprecated, still public surface
];

const COMPONENT_VAR_RE = /^--components?-/;
// The class-name group allows CSS-escaped characters (`\.`) so selectors like
// `.pr-u-width100\%` are captured; the escape is stripped when the name is stored.
const UTILITY_SELECTOR_RE = /^(?::root\s+)?\.((?:pr-)?u-(?:[A-Za-z0-9]|\\.)+)((?:::?)[A-Za-z-][\w-]*)?$/;

/**
 * The synthetic entry compiled to expose the entire API surface. Mirrors
 * `.storybook/styles.scss` config plus the deprecated utility prefix so the
 * manifest can flag `u-*` twins.
 */
const ENTRY_SCSS = `
@use '@lucca-front/scss/src/commons/config' with (
	$palettesOtherProduct: 'all',
	$deprecatedUtilityPrefix: true,
	$fontFamilyCursive: 'Caveat'
);
@use '@lucca-front/scss/src/main-all';
`;

/**
 * @param {string} prop
 * @returns {string | undefined}
 */
function categoryFor(prop) {
	for (const { prefix, category } of VARIABLE_CATEGORIES) {
		if (prop.startsWith(prefix)) {
			return category;
		}
	}
	return undefined;
}

/**
 * Returns true when the rule sits under a `@media`/`@container` at-rule.
 * `@layer` ancestors are fine (all our output is layered).
 * @param {import('postcss').Rule} rule
 */
function hasConditionalAncestor(rule) {
	let parent = rule.parent;
	while (parent) {
		if (parent.type === 'atrule' && (parent.name === 'media' || parent.name === 'container')) {
			return true;
		}
		parent = parent.parent;
	}
	return false;
}

/**
 * Resolves `var()` references against the collected variable map, iteratively,
 * so hover can show a concrete value. Falls back to the `var()` fallback arg
 * when the referenced name is unknown, and gives up after `maxDepth` passes.
 * @param {string} value
 * @param {Map<string, string>} varMap raw values keyed by property name
 * @param {number} maxDepth
 */
function resolveValue(value, varMap, maxDepth = 10) {
	let current = value;
	for (let depth = 0; depth < maxDepth; depth++) {
		let replaced = false;
		const parsed = valueParser(current);
		parsed.walk((node) => {
			if (node.type === 'function' && node.value === 'var') {
				const nameNode = node.nodes.find((n) => n.type === 'word' && n.value.startsWith('--'));
				if (!nameNode) {
					return;
				}
				const referenced = varMap.get(nameNode.value);
				if (referenced !== undefined) {
					node.type = 'word';
					node.value = referenced;
					delete node.nodes;
					replaced = true;
				} else {
					// Use the fallback argument (everything after the first comma) if present.
					const commaIndex = node.nodes.findIndex((n) => n.type === 'div' && n.value === ',');
					if (commaIndex !== -1) {
						const fallback = valueParser.stringify(node.nodes.slice(commaIndex + 1)).trim();
						node.type = 'word';
						node.value = fallback;
						delete node.nodes;
						replaced = true;
					}
				}
			}
		});
		current = parsed.toString();
		if (!replaced) {
			break;
		}
	}
	return current.trim();
}

/**
 * Reads a `/* @deprecated optional note *\/` loud comment immediately preceding
 * a node, if present. Loud comments survive expanded output but are stripped
 * from the shipped compressed CSS.
 * @param {import('postcss').Node} node
 * @returns {{ note?: string } | undefined}
 */
function readDeprecatedComment(node) {
	const prev = node.prev();
	if (prev && prev.type === 'comment') {
		const match = /^\s*@deprecated\b\s*(.*)$/s.exec(prev.text);
		if (match) {
			const note = match[1].trim();
			return note ? { note } : {};
		}
	}
	return undefined;
}

/**
 * Collects the contiguous `//`/`///` comment lines immediately above `index`,
 * as a single trimmed string (or undefined). Doc for the mixin, when present.
 * @param {string} source
 * @param {number} index offset of the `@mixin` keyword
 * @returns {string | undefined}
 */
function leadingComment(source, index) {
	const lines = source.slice(0, index).split('\n');
	lines.pop(); // the (partial) line the @mixin sits on
	const comments = [];
	for (let i = lines.length - 1; i >= 0; i--) {
		const line = lines[i].trim();
		if (line.startsWith('//')) {
			comments.unshift(line.replace(/^\/+\s?/, ''));
		} else {
			break;
		}
	}
	const doc = comments.join(' ').trim();
	return doc || undefined;
}

/**
 * Parses `@mixin` definitions out of a SCSS source string. Scans the parameter
 * list with balanced-paren matching so defaults containing parens (`var(...)`,
 * `linear-gradient(...)`) survive intact.
 * @param {string} source
 * @returns {Array<{ name: string, params: string, doc?: string }>}
 */
function parseMixins(source) {
	const result = [];
	const re = /@mixin\s+([\w-]+)/g;
	let match;
	while ((match = re.exec(source)) !== null) {
		const name = match[1];
		let i = re.lastIndex;
		while (i < source.length && /\s/.test(source[i])) {
			i++;
		}
		let params = '';
		if (source[i] === '(') {
			const start = i;
			let depth = 0;
			for (; i < source.length; i++) {
				if (source[i] === '(') {
					depth++;
				} else if (source[i] === ')') {
					depth--;
					if (depth === 0) {
						i++;
						break;
					}
				}
			}
			params = source
				.slice(start + 1, i - 1)
				.trim()
				.replace(/\s+/g, ' ');
		}
		const entry = { name, params };
		const doc = leadingComment(source, match.index);
		if (doc) {
			entry.doc = doc;
		}
		result.push(entry);
	}
	return result;
}

/**
 * Enumerates the consumer-facing mixins in `commons/utils/*.scss`. Each entry
 * carries the `@use` import path and namespace (the file basename) a consumer
 * writes to call it, so the extension can offer completion + auto-import.
 * @returns {Array<{ name: string, namespace: string, module: string, import: string, params: string, signature: string, doc?: string }>}
 */
function extractMixins() {
	const out = [];
	let files;
	try {
		files = fs.readdirSync(UTILS_DIR);
	} catch {
		return out;
	}
	for (const file of files.sort()) {
		if (!file.endsWith('.scss')) {
			continue;
		}
		const base = file.replace(/\.scss$/, '').replace(/^_/, '');
		if (EXCLUDED_MIXIN_FILES.has(base)) {
			continue;
		}
		const source = fs.readFileSync(path.join(UTILS_DIR, file), 'utf8');
		for (const mixin of parseMixins(source)) {
			const entry = {
				name: mixin.name,
				namespace: base,
				module: `commons/utils/${base}`,
				import: `${MIXIN_IMPORT_BASE}/${base}`,
				params: mixin.params,
				signature: mixin.params ? `${mixin.name}(${mixin.params})` : mixin.name,
			};
			if (mixin.doc) {
				entry.doc = mixin.doc;
			}
			out.push(entry);
		}
	}
	return out;
}

/**
 * Compiles the SCSS surface and extracts the manifest.
 * @returns {{ manifestVersion: number, package: string, variables: object, utilities: object, mixins: object[] }}
 */
function extract() {
	const compiled = sass.compileString(ENTRY_SCSS, {
		style: 'expanded',
		loadPaths: [NODE_MODULES],
	});
	const root = postcss.parse(compiled.css);

	// --- Variables ---
	/** @type {Map<string, string>} raw value for var() resolution (all custom props) */
	const rawValues = new Map();
	/** @type {Map<string, { value: string, category: string, deprecated?: boolean, note?: string }>} */
	const variables = new Map();

	root.walkDecls((decl) => {
		if (!decl.prop.startsWith('--')) {
			return;
		}
		// Record every custom property (even component/internal ones) so var()
		// chains referencing them can resolve.
		if (!rawValues.has(decl.prop)) {
			rawValues.set(decl.prop, decl.value);
		}

		if (COMPONENT_VAR_RE.test(decl.prop)) {
			return; // internal, excluded from the public manifest
		}
		const category = categoryFor(decl.prop);
		if (!category) {
			return;
		}
		if (decl.parent.type !== 'rule') {
			return;
		}
		// Canonical value: :root declaration, no media/container ancestor.
		const selectors = decl.parent.selectors || [];
		const isRoot = selectors.some((s) => s.trim() === ':root');
		if (!isRoot || hasConditionalAncestor(decl.parent)) {
			return;
		}
		if (variables.has(decl.prop)) {
			return; // first :root wins (document/cascade order)
		}

		const entry = { value: decl.value, category };
		if (isDeprecatedVariable(decl.prop)) {
			entry.deprecated = true;
		}
		const comment = readDeprecatedComment(decl);
		if (comment) {
			entry.deprecated = true;
			if (comment.note) {
				entry.note = comment.note;
			}
		}
		variables.set(decl.prop, entry);
	});

	// Resolve var() chains now the full map is available.
	for (const [, entry] of variables) {
		const resolved = resolveValue(entry.value, rawValues);
		if (resolved && resolved !== entry.value) {
			entry.resolved = resolved;
		}
	}

	// --- Utility classes ---
	/** @type {Map<string, { css: object[], deprecated?: boolean, replacement?: string, note?: string }>} */
	const utilities = new Map();
	/** @type {Map<string, object[]>} decls contributed by [class*='pr-u-animated'] rules */
	const animatedShared = [];

	root.walkRules((rule) => {
		// Skip keyframe steps and the like.
		let parent = rule.parent;
		while (parent) {
			if (parent.type === 'atrule' && parent.name === 'keyframes') {
				return;
			}
			parent = parent.parent;
		}

		const decls = collectDecls(rule);
		if (decls === '') {
			// still process (rare empty rule) but nothing to record
		}

		// Capture the shared animated attribute rule declarations.
		for (const sel of rule.selectors) {
			if (/\[class\*=['"](?:pr-)?u-animated['"]\]/.test(sel) && decls) {
				animatedShared.push({ decls });
			}
		}

		for (const sel of rule.selectors) {
			const match = UTILITY_SELECTOR_RE.exec(sel.trim());
			if (!match) {
				continue;
			}
			// Strip CSS escapes so the stored name matches what a consumer writes
			// in markup (`.pr-u-width100\%` selector → `pr-u-width100%` class).
			const className = match[1].replace(/\\(.)/g, '$1');
			const pseudo = match[2];
			if (!decls) {
				continue;
			}

			const block = { decls };
			if (pseudo) {
				block.sel = pseudo;
			}
			const conditional = conditionalContext(rule);
			if (conditional) {
				Object.assign(block, conditional);
			}

			let entry = utilities.get(className);
			if (!entry) {
				entry = { css: [] };
				const dep = classDeprecation(className);
				if (dep) {
					entry.deprecated = true;
					if (dep.replacement) {
						entry.replacement = dep.replacement;
					}
				}
				const comment = readDeprecatedComment(rule);
				if (comment) {
					entry.deprecated = true;
					if (comment.note) {
						entry.note = comment.note;
					}
				}
				utilities.set(className, entry);
			}
			// Dedupe identical blocks.
			const key = JSON.stringify(block);
			if (!entry.css.some((b) => JSON.stringify(b) === key)) {
				entry.css.push(block);
			}
		}
	});

	// Palette colour classes: `pr-u-text<Suffix>` is the deprecated twin of the
	// modern `pr-u-colorText<Suffix>`. Derived here (rather than by regex) so the
	// mapping is exact and correctly cased.
	for (const name of utilities.keys()) {
		const match = /^pr-u-colorText(.+)$/.exec(name);
		if (!match) {
			continue;
		}
		const twin = `pr-u-text${match[1]}`;
		const twinEntry = utilities.get(twin);
		if (twinEntry && !twinEntry.deprecated) {
			twinEntry.deprecated = true;
			twinEntry.replacement = name;
		}
	}

	// Merge shared animated declarations into every animated utility.
	if (animatedShared.length) {
		for (const [name, entry] of utilities) {
			if (/^(?:pr-)?u-animated/.test(name)) {
				for (const shared of animatedShared) {
					const key = JSON.stringify(shared);
					if (!entry.css.some((b) => JSON.stringify(b) === key)) {
						entry.css.unshift(shared);
					}
				}
			}
		}
	}

	// Validate replacements: a `replacement` must point to an existing,
	// non-deprecated utility. Follow chains (e.g. u-marginTop100 →
	// pr-u-marginTop100 → pr-u-marginBlockStart100) so a deprecated hop resolves
	// to its own modern target. Drop replacements that can't be resolved.
	for (const [name, entry] of utilities) {
		if (!entry.replacement) {
			continue;
		}
		const resolved = resolveReplacement(name, entry.replacement, utilities);
		if (resolved) {
			entry.replacement = resolved;
		} else {
			// Warn only for a genuine miss: a derived target that doesn't exist as
			// a class (worth investigating). Silently drop when the target exists
			// but is a deprecated dead-end with no modern twin (expected).
			if (!utilities.has(entry.replacement)) {
				// eslint-disable-next-line no-console
				console.warn(`[css-api] dropping non-existent replacement for ${name}: ${entry.replacement}`);
			}
			delete entry.replacement;
		}
	}

	// Resolve var() chains in utility declarations for hover display.
	for (const [, entry] of utilities) {
		for (const block of entry.css) {
			if (block.decls.includes('var(')) {
				const resolved = resolveDecls(block.decls, rawValues);
				if (resolved !== block.decls) {
					block.resolved = resolved;
				}
			}
		}
	}

	return {
		manifestVersion: MANIFEST_VERSION,
		package: '@lucca-front/scss',
		variables: mapToObject(variables),
		utilities: mapToObject(utilities),
		mixins: extractMixins(),
	};
}

/**
 * Follows a replacement chain to the first existing, non-deprecated utility.
 * Returns undefined when the chain dead-ends (missing or only-deprecated).
 * @param {string} from origin class name (to break self-cycles)
 * @param {string} replacement initial replacement target
 * @param {Map<string, { deprecated?: boolean, replacement?: string }>} utilities
 * @returns {string | undefined}
 */
function resolveReplacement(from, replacement, utilities) {
	const seen = new Set([from]);
	let target = replacement;
	while (target && !seen.has(target)) {
		seen.add(target);
		const entry = utilities.get(target);
		if (!entry) {
			return undefined; // target doesn't exist
		}
		if (!entry.deprecated) {
			return target; // reached a modern class
		}
		target = entry.replacement; // hop to its replacement
	}
	return undefined;
}

/**
 * Resolves var() references inside a `prop: value; prop: value` declaration
 * string, preserving property names and `!important`.
 * @param {string} decls
 * @param {Map<string, string>} rawValues
 * @returns {string}
 */
function resolveDecls(decls, rawValues) {
	return decls
		.split('; ')
		.map((segment) => {
			const idx = segment.indexOf(': ');
			if (idx === -1) {
				return segment;
			}
			const prop = segment.slice(0, idx);
			const value = segment.slice(idx + 2);
			if (!value.includes('var(')) {
				return segment;
			}
			return `${prop}: ${resolveValue(value, rawValues)}`;
		})
		.join('; ');
}

/**
 * Serialises a rule's own declarations to `prop: value; prop: value` form.
 * @param {import('postcss').Rule} rule
 * @returns {string}
 */
function collectDecls(rule) {
	const parts = [];
	rule.each((node) => {
		if (node.type === 'decl') {
			parts.push(`${node.prop}: ${node.value}${node.important ? ' !important' : ''}`);
		}
	});
	return parts.join('; ');
}

/**
 * @param {import('postcss').Rule} rule
 * @returns {{ media?: string } | { container?: string } | undefined}
 */
function conditionalContext(rule) {
	let parent = rule.parent;
	while (parent) {
		if (parent.type === 'atrule' && parent.name === 'media') {
			return { media: parent.params };
		}
		if (parent.type === 'atrule' && parent.name === 'container') {
			return { container: parent.params };
		}
		parent = parent.parent;
	}
	return undefined;
}

/**
 * @param {Map<string, object>} map
 */
function mapToObject(map) {
	const out = {};
	for (const [key, value] of map) {
		out[key] = value;
	}
	return out;
}

/**
 * Validates the extracted manifest, throwing on any regression. This is the
 * build-time guard (no separate test suite to maintain).
 * @param {ReturnType<typeof extract>} manifest
 */
function selfCheck(manifest) {
	const errors = [];
	const varNames = Object.keys(manifest.variables);
	const utilNames = Object.keys(manifest.utilities);

	const prUCount = utilNames.filter((n) => n.startsWith('pr-u-')).length;
	const bareUCount = utilNames.filter((n) => /^u-/.test(n)).length;

	if (varNames.length < 400) {
		errors.push(`Expected >=400 custom properties, got ${varNames.length}`);
	}
	if (prUCount < 750) {
		errors.push(`Expected >=750 pr-u-* classes, got ${prUCount}`);
	}
	if (bareUCount < 200) {
		errors.push(`Expected >=200 deprecated u-* classes, got ${bareUCount}`);
	}

	const componentLeak = varNames.filter((n) => COMPONENT_VAR_RE.test(n));
	if (componentLeak.length) {
		errors.push(`Component-scoped vars leaked into manifest (${componentLeak.length}), e.g. ${componentLeak[0]}`);
	}

	const categories = new Set(Object.values(manifest.variables).map((v) => v.category));
	for (const expected of ['token', 'palette', 'breakpoint', 'commons']) {
		if (!categories.has(expected)) {
			errors.push(`No variables in category "${expected}"`);
		}
	}

	// Value sentinels.
	const brand500 = manifest.variables['--palettes-brand-500'];
	if (!brand500 || (brand500.resolved || brand500.value) !== '#ff9361') {
		errors.push(`--palettes-brand-500 sentinel failed: ${JSON.stringify(brand500)}`);
	}
	const displayFlex = manifest.utilities['pr-u-displayFlex'];
	if (!displayFlex || !displayFlex.css.some((b) => b.decls === 'display: flex !important')) {
		errors.push(`pr-u-displayFlex sentinel failed: ${JSON.stringify(displayFlex)}`);
	}
	const responsive = manifest.utilities['pr-u-displayNoneAtMediaMinS'];
	if (!responsive || !responsive.css.some((b) => b.media)) {
		errors.push(`pr-u-displayNoneAtMediaMinS media sentinel failed: ${JSON.stringify(responsive)}`);
	}
	// Escaped-selector sentinel: `.pr-u-width100\%` must be stored as `pr-u-width100%`.
	const width100 = manifest.utilities['pr-u-width100%'];
	if (!width100 || !width100.css.some((b) => b.decls === 'width: 100% !important')) {
		errors.push(`pr-u-width100% escaped-selector sentinel failed: ${JSON.stringify(width100)}`);
	}
	// Derived replacement sentinel.
	const marginTop = manifest.utilities['pr-u-marginTop100'];
	if (!marginTop || marginTop.replacement !== 'pr-u-marginBlockStart100') {
		errors.push(`pr-u-marginTop100 replacement sentinel failed: ${JSON.stringify(marginTop)}`);
	}
	// Resolved utility-value sentinel.
	const marginInline = manifest.utilities['pr-u-marginInlineStart100'];
	const resolvedBlock = marginInline && marginInline.css.find((b) => b.resolved);
	if (!resolvedBlock || resolvedBlock.resolved.includes('var(')) {
		errors.push(`pr-u-marginInlineStart100 resolved sentinel failed: ${JSON.stringify(marginInline)}`);
	}
	// Every replacement must point to an existing, non-deprecated utility.
	for (const [name, utility] of Object.entries(manifest.utilities)) {
		if (utility.replacement) {
			const target = manifest.utilities[utility.replacement];
			if (!target || target.deprecated) {
				errors.push(`${name} has invalid replacement ${utility.replacement}`);
			}
		}
	}

	// Mixins.
	const mixins = manifest.mixins || [];
	if (mixins.length < 30) {
		errors.push(`Expected >=30 mixins, got ${mixins.length}`);
	}
	const mixinKeys = new Set(mixins.map((m) => `${m.namespace}.${m.name}`));
	for (const expected of ['media.min', 'media.max', 'a11y.focusVisible', 'loading.spinner', 'reset.clearfix']) {
		if (!mixinKeys.has(expected)) {
			errors.push(`Missing expected mixin ${expected}`);
		}
	}
	const spinner = mixins.find((m) => m.namespace === 'loading' && m.name === 'spinner');
	if (!spinner || !spinner.import.endsWith('/commons/utils/loading') || !/\$size/.test(spinner.params)) {
		errors.push(`loading.spinner mixin sentinel failed: ${JSON.stringify(spinner)}`);
	}

	if (errors.length) {
		throw new Error(`CSS API manifest self-check failed:\n  - ${errors.join('\n  - ')}`);
	}
}

/**
 * Generates the manifest and writes it to `output`.
 * @param {{ output: string }} options
 */
function generateCssApi({ output }) {
	const manifest = extract();
	selfCheck(manifest);
	const dir = path.dirname(output);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	fs.writeFileSync(output, JSON.stringify(manifest));
	return manifest;
}

module.exports = generateCssApi;

if (require.main === module) {
	const output = process.argv[2] || path.join(REPO_ROOT, 'dist', 'scss', 'css-api', 'manifest.json');
	const manifest = generateCssApi({ output });
	const varCount = Object.keys(manifest.variables).length;
	const utilCount = Object.keys(manifest.utilities).length;
	const mixinCount = manifest.mixins.length;
	const bytes = fs.statSync(output).size;
	console.log(`CSS API manifest written to ${output}`);
	console.log(`  ${varCount} custom properties, ${utilCount} utility classes, ${mixinCount} mixins, ${(bytes / 1024).toFixed(1)} KB`);
}
