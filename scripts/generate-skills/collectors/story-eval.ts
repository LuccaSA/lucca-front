/**
 * Storybook story renderer — deterministically resolves story templates by
 * *evaluating* the story's `render()` (or `Template`) function at its declared
 * default args, exactly like Storybook does at runtime.
 *
 * Why: story templates are JS template literals full of interpolations —
 * `${generateInputs(inputs, argTypes)}`, `${luButton !== '' ? `="${luButton}"` : ''}`,
 * local fragment consts (`${tagTemplate}`), etc. Pure text extraction can only
 * replace these with an opaque `${…}` placeholder, producing unusable code such as
 * `<button luButton${…}${…}>`. Evaluating the render at default args resolves them
 * to real, copy-pastable markup.
 *
 * Safety: story source is first-party code read from a pinned git tag. We transpile
 * it to CommonJS and run it in a `vm` context with NO Node globals, a `require` that
 * returns inert stubs for every import (except the in-repo story helpers, which we
 * re-implement faithfully), and a hard timeout. Any failure falls back to the caller's
 * static extraction — we never emit a worse result than before.
 */

import vm from 'vm';
import * as ts from 'typescript';

/** Strip a single layer of matching surrounding quotes from an AST default literal. */
function unquote(value: string): string {
	const trimmed = value.trim();
	if (trimmed.length >= 2) {
		const first = trimmed[0];
		const last = trimmed[trimmed.length - 1];
		if ((first === "'" || first === '"' || first === '`') && first === last) {
			return trimmed.slice(1, -1);
		}
	}
	return trimmed;
}

/**
 * Faithful re-implementation of the repo's `generateInputs` helper
 * (stories/helpers/stories.ts), but fed with the component's AST-extracted input
 * defaults so that default-valued args are correctly omitted — matching what
 * Storybook produces when its argTypes carry the component's default values.
 */
function makeGenerateInputs(defaults: Map<string, string>) {
	return function generateInputs(inputs: Record<string, unknown>, argTypes: Record<string, any>, disableBooleanAttributes = false): string {
		if (!inputs || typeof inputs !== 'object') return '';
		const types = argTypes ?? {};
		return Object.entries(inputs).reduce((acc, [name, value]) => {
			const argType = types[name];
			// Mirror the original: only consider declared inputs, skip non-"inputs" categories.
			if (!argType || (argType.table && argType.table.category && argType.table.category !== 'inputs')) {
				return acc;
			}
			const def = defaults.has(name) ? defaults.get(name) : argType.table?.defaultValue?.summary;
			if (value === def || value === null || value === undefined || (typeof value === 'string' && value.length === 0)) {
				return acc;
			}
			if (!disableBooleanAttributes && typeof value === 'boolean') {
				return value ? `${acc} ${name}` : acc;
			}
			if (typeof value === 'object') return acc; // can't render objects/arrays as attributes
			return `${acc} ${name}="${String(value)}"`;
		}, '');
	};
}

/** Universal inert stub: callable, indexable, coerces to '' in template literals. */
function makeStub(): any {
	const fn: any = function () {
		return makeStub();
	};
	return new Proxy(fn, {
		get(_t, p) {
			if (p === Symbol.toPrimitive) return () => '';
			if (p === 'toString' || p === 'valueOf') return () => '';
			if (p === Symbol.iterator) return undefined; // keep non-iterable so spreads fail loudly → caught
			return makeStub();
		},
		apply() {
			return makeStub();
		},
	});
}

interface EvaluatedModule {
	meta: any;
	exports: Record<string, any>;
}

/** Transpile + run a story module in an isolated context. Returns its exports, or null on failure. */
function evaluateModule(source: string, defaults: Map<string, string>): EvaluatedModule | null {
	let js: string;
	try {
		js = ts.transpileModule(source, {
			compilerOptions: {
				module: ts.ModuleKind.CommonJS,
				target: ts.ScriptTarget.ES2020,
				esModuleInterop: true,
				isolatedModules: false,
			},
		}).outputText;
	} catch {
		return null;
	}

	const generateInputs = makeGenerateInputs(defaults);

	const requireStub = (id: string): any => {
		// In-repo story helpers: re-implement the pure ones faithfully, stub the rest.
		if (id.includes('helpers/stories')) {
			return {
				generateInputs,
				setStoryOptions: <T>(list: readonly T[]) => ['', ...(Array.isArray(list) ? list : [])],
				cleanupTemplate: (t: string) => t,
				generateMarkdownCodeBlock: () => '',
				useDocumentationStory: () => ({}),
				createTestStory: (story: any) => story,
				getStoryGenerator:
					() =>
					({ template }: any) => ({ render: (args: any) => ({ props: args, template }) }),
			};
		}
		return makeStub();
	};

	const moduleObj = { exports: {} as Record<string, any> };
	const sandbox: any = {
		module: moduleObj,
		exports: moduleObj.exports,
		require: requireStub,
		console: { log() {}, warn() {}, error() {}, info() {}, debug() {} },
	};
	sandbox.globalThis = sandbox;

	try {
		vm.runInNewContext(js, sandbox, { timeout: 2000, displayErrors: false });
	} catch {
		return null;
	}

	const exportsObj = moduleObj.exports ?? {};
	return { meta: exportsObj.default ?? {}, exports: exportsObj };
}

/** Invoke a story's render (or the meta render) at default args; return its template string. */
function renderTemplate(meta: any, story: any): string | null {
	const render = (story && typeof story.render === 'function' && story.render) || (typeof meta?.render === 'function' && meta.render);
	if (typeof render !== 'function') return null;

	const args = { ...(meta?.args ?? {}), ...(story?.args ?? {}) };
	const argTypes = { ...(meta?.argTypes ?? {}), ...(story?.argTypes ?? {}) };

	try {
		const result = render(args, { argTypes });
		const tpl = result?.template;
		return typeof tpl === 'string' && tpl.trim().length > 0 ? tpl : null;
	} catch {
		return null;
	}
}

/**
 * Renders all non-TEST story exports of a module at their default args.
 *
 * @param source — full story file source (read from a git tag)
 * @param defaults — component input defaults (name → value), used by generateInputs
 * @param max — cap on number of templates returned
 * @returns deduped rendered templates, or null if evaluation produced nothing usable
 */
export function renderStoryTemplates(source: string, defaults: Map<string, string>, max = 5): string[] | null {
	const mod = evaluateModule(source, defaults);
	if (!mod) return null;

	const storyExports = Object.entries(mod.exports).filter(
		([name, val]) => name !== 'default' && !/TEST$/.test(name) && val && typeof val === 'object',
	);

	const candidates: [string, any][] = storyExports.length > 0 ? storyExports : [['_meta', mod.meta]];

	const seen = new Set<string>();
	const templates: string[] = [];
	for (const [, story] of candidates) {
		const tpl = renderTemplate(mod.meta, story);
		if (!tpl) continue;
		// A successful render must not leave raw interpolation behind.
		if (tpl.includes('${')) continue;
		const key = tpl.trim();
		if (seen.has(key)) continue;
		seen.add(key);
		templates.push(tpl);
		if (templates.length >= max) break;
	}

	return templates.length > 0 ? templates : null;
}

/**
 * Renders a single "basic" story template (used for the component's Basic Usage snippet).
 * Returns the first usable rendered template, or null.
 */
export function renderBasicStoryTemplate(source: string, defaults: Map<string, string>): string | null {
	const templates = renderStoryTemplates(source, defaults, 1);
	return templates?.[0] ?? null;
}

/** Builds a name → default-value map from a component's extracted inputs (quotes stripped). */
export function buildInputDefaults(inputs: { propName: string; bindingName: string; default?: string }[]): Map<string, string> {
	const map = new Map<string, string>();
	for (const inp of inputs) {
		if (inp.default === undefined) continue;
		const value = unquote(inp.default);
		map.set(inp.propName, value);
		map.set(inp.bindingName, value);
	}
	return map;
}
