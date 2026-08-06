/**
 * Unit tests for the rendering / selection / coverage / deprecation logic. These are
 * pure functions over a compodoc-shaped `doc`, so the tests use small synthetic docs
 * (no ts-morph, no repo). Runs under the `api-docs` vitest project (Node environment).
 */
import { describe, expect, test } from 'vitest';

import {
	cleanCell,
	collectDeprecations,
	coverageReport,
	entryPointMeta,
	renderComponentOrDirective,
	renderEntrypointDoc,
	renderFunction,
	renderInterface,
	renderLlmsFull,
	renderLlmsIndex,
	replacementFrom,
	selectPublicApi,
} from './generate-llms.mjs';

/** An empty compodoc-shaped doc with the given bucket overrides. */
function docWith(overrides) {
	return {
		components: [],
		directives: [],
		injectables: [],
		interfaces: [],
		classes: [],
		miscellaneous: { functions: [], typealiases: [], enumerations: [], variables: [] },
		...overrides,
	};
}

describe('renderComponentOrDirective', () => {
	const entity = {
		name: 'DemoComponent',
		rawdescription: 'A demo.',
		selector: 'lu-demo',
		deprecated: false,
		inputsClass: [
			{ name: 'size', type: "'s' | 'm'", required: true, rawdescription: 'The size.' },
			{ name: 'a', type: 'string', defaultValue: 'x', required: false, rawdescription: '' },
		],
		outputsClass: [{ name: 'closed', type: 'void', rawdescription: 'Closed.' }],
		methodsClass: [
			{ name: 'open', args: [{ name: 'force?', type: 'boolean' }], returnType: 'void', rawdescription: 'Open.' },
			{ name: 'ngOnInit', args: [], returnType: 'void' },
		],
	};
	const out = renderComponentOrDirective({ entity });

	test('renders heading, description and selector', () => {
		expect(out).toMatch(/^## DemoComponent$/m);
		expect(out).toMatch(/^A demo\.$/m);
		expect(out).toMatch(/\*\*Selector:\*\* `lu-demo`/);
	});

	test('renders an inputs table with required/default columns, sorted by name', () => {
		expect(out).toMatch(/\| `a` \| `string` \| `x` \| no \|\s+\|/);
		expect(out).toMatch(/\| `size` \| `'s' \\\| 'm'` \| — \| yes \| The size\. \|/);
		expect(out.indexOf('| `a`')).toBeLessThan(out.indexOf('| `size`'));
	});

	test('renders outputs and excludes lifecycle methods', () => {
		expect(out).toMatch(/\| `closed` \| `void` \| Closed\. \|/);
		expect(out).toMatch(/\| `open\(force\?: boolean\)` \| `void` \| Open\. \|/);
		expect(out).not.toContain('ngOnInit');
	});
});

test('deprecation block renders as a blockquote under the heading', () => {
	const out = renderComponentOrDirective({
		entity: { name: 'OldComponent', deprecated: true, deprecationMessage: 'use `New` instead' },
	});
	expect(out).toMatch(/> \*\*Deprecated\.\*\* use `New` instead/);
});

test('renderFunction keeps every overload signature', () => {
	const out = renderFunction({
		entity: {
			name: 'make',
			signatures: [
				{ typeParameters: ['T'], args: [{ name: 'a', type: 'T' }], returnType: 'T' },
				{ args: [{ name: 'a', type: 'number' }], returnType: 'number' },
			],
		},
	});
	expect(out).toMatch(/function make<T>\(a: T\): T/);
	expect(out).toMatch(/function make\(a: number\): number/);
});

test('renderInterface mirrors the readonly/optional modifier order', () => {
	const out = renderInterface({
		entity: {
			name: 'Cfg',
			properties: [
				{ name: 'id', type: 'string', readonly: true, optional: false, rawdescription: 'The id.' },
				{ name: 'name', type: 'string', readonly: false, optional: true, rawdescription: '' },
			],
		},
	});
	expect(out).toMatch(/\| `readonly id` \| `string` \| The id\. \|/);
	expect(out).toMatch(/\| `name\?` \| `string` \|\s+\|/);
});

describe('cleanCell', () => {
	const cases = [
		{ label: 'escapes pipes', raw: 'a | b', expected: 'a \\| b' },
		{ label: 'strips HTML tags in prose', raw: '<b>bold</b> text', expected: 'bold text' },
		{ label: 'preserves inline code spans verbatim', raw: 'keep `<code>` span', expected: 'keep `<code>` span' },
		{ label: 'cuts at the first block tag', raw: 'summary @param x the x', expected: 'summary' },
	];
	test.each(cases)('$label', ({ raw, expected }) => {
		expect(cleanCell(raw)).toBe(expected);
	});
});

describe('selectPublicApi & coverageReport', () => {
	const doc = docWith({
		components: [
			{ name: 'DocumentedComponent', rawdescription: 'Has docs.' },
			{ name: 'UndocumentedComponent', rawdescription: '' },
		],
	});
	const names = new Set(['DocumentedComponent', 'UndocumentedComponent', 'ReExportedValue']);

	test('selectPublicApi matches renderable entities and lists the rest as unmatched', () => {
		const { matched, unmatched } = selectPublicApi(doc, names);
		expect(matched.map((m) => m.name)).toEqual(['DocumentedComponent', 'UndocumentedComponent']);
		expect(unmatched).toEqual(['ReExportedValue']);
	});

	test('coverageReport counts documented vs missing and excludes names absent from the extraction', () => {
		const r = coverageReport(doc, names);
		expect(r.total).toBe(2);
		expect(r.documented).toBe(1);
		expect(r.coverage).toBe(50);
		expect(r.missing).toEqual(['UndocumentedComponent']);
		expect(r.external).toEqual(['ReExportedValue']);
	});
});

describe('deprecations', () => {
	const doc = docWith({
		components: [
			{
				name: 'OldComponent',
				deprecated: true,
				deprecationMessage: 'use `NewComponent` instead',
				inputsClass: [{ name: 'legacy', deprecated: true, deprecationMessage: 'gone' }],
				outputsClass: [],
				methodsClass: [],
			},
		],
	});

	test('replacementFrom extracts the first backticked symbol', () => {
		expect(replacementFrom('use `NewComponent` instead')).toBe('NewComponent');
		expect(replacementFrom('no replacement')).toBe(null);
	});

	test('collectDeprecations gathers entity and member deprecations, sorted, with public flag', () => {
		expect(collectDeprecations(doc, new Set(['OldComponent']))).toEqual([
			{ symbol: 'OldComponent', type: 'component', public: true, message: 'use `NewComponent` instead', replacement: 'NewComponent' },
			{ symbol: 'OldComponent.legacy', type: 'input', public: true, message: 'gone', replacement: null },
		]);
	});
});

describe('entryPointMeta', () => {
	const cases = [
		{
			label: 'ng secondary entry point',
			pkg: { name: '@lucca-front/ng', root: 'packages/ng' },
			barrel: '/repo/packages/ng/button/public-api.ts',
			expected: { importPath: '@lucca-front/ng/button', slug: 'ng-button' },
		},
		{
			label: 'prisme entry point',
			pkg: { name: '@lucca/prisme', root: 'packages/prisme' },
			barrel: '/repo/packages/prisme/core/public-api.ts',
			expected: { importPath: '@lucca/prisme/core', slug: 'prisme-core' },
		},
		{
			label: 'nested entry point keeps its whole path',
			pkg: { name: '@lucca-front/ng', root: 'packages/ng' },
			barrel: '/repo/packages/ng/forms/date/public-api.ts',
			expected: { importPath: '@lucca-front/ng/forms/date', slug: 'ng-forms-date' },
		},
	];
	test.each(cases)('$label', ({ pkg, barrel, expected }) => {
		expect(entryPointMeta(pkg, '/repo', barrel)).toEqual({ ...expected, package: pkg.name, barrel });
	});
});

describe('renderEntrypointDoc', () => {
	const entry = {
		importPath: '@lucca-front/ng/button',
		api: { matched: [{ kind: 'component', entity: { name: 'ButtonComponent', rawdescription: 'A button.' } }] },
	};

	test('emits the import path heading, the import hint and the rendered entities', () => {
		const out = renderEntrypointDoc(entry);
		expect(out).toMatch(/^# @lucca-front\/ng\/button — API$/m);
		expect(out).toMatch(/from '@lucca-front\/ng\/button'/);
		expect(out).toMatch(/^## ButtonComponent$/m);
	});
});

describe('renderLlmsIndex', () => {
	const out = renderLlmsIndex({
		baseUrl: 'https://lucca-front.lucca.io/master/storybook',
		entryPoints: [
			{ importPath: '@lucca-front/ng/button', slug: 'ng-button', api: { matched: [{ name: 'ButtonComponent' }] } },
			{ importPath: '@lucca/prisme/core', slug: 'prisme-core', api: { matched: [{ name: 'PALETTE' }] } },
		],
		storyCategories: [{ slug: 'stories-actions', category: 'Actions', components: ['Button'] }],
	});

	test('lists every entry point as an absolute lucca-front.lucca.io link', () => {
		expect(out).toMatch(/\[@lucca-front\/ng\/button\]\(https:\/\/lucca-front\.lucca\.io\/master\/storybook\/llms\/ng-button\.md\)/);
		expect(out).toMatch(/\[@lucca\/prisme\/core\]\(https:\/\/lucca-front\.lucca\.io\/master\/storybook\/llms\/prisme-core\.md\)/);
		expect(out).not.toContain('dd.lucca.tech');
	});

	test('lists the story categories and the full corpus', () => {
		expect(out).toMatch(/\[Actions stories\]\(https:\/\/lucca-front\.lucca\.io\/master\/storybook\/llms\/stories-actions\.md\)/);
		expect(out).toMatch(/llms-full\.txt/);
	});

	test('points to the Prisme design-system reference on zeroheight', () => {
		expect(out).toContain('https://prisme.lucca.io');
	});
});

describe('renderLlmsFull', () => {
	const api = { matched: [{ kind: 'component', entity: { name: 'DemoComponent', rawdescription: 'A demo.' } }] };

	test('emits the header with the entry count and the rendered body', () => {
		const out = renderLlmsFull(api);
		expect(out).toMatch(/^# lucca-front — LLM API reference$/m);
		expect(out).toContain('@lucca-front/ng');
		expect(out).toContain('@lucca/prisme');
		expect(out).toMatch(/^Public API entries: 1$/m);
		expect(out).toMatch(/^## DemoComponent$/m);
	});

	test('is deterministic — identical input yields byte-identical output', () => {
		expect(renderLlmsFull(api)).toBe(renderLlmsFull(api));
	});
});
