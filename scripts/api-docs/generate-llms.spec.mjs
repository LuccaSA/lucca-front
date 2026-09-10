/**
 * Unit tests for the rendering / selection / coverage / deprecation logic. These are
 * pure functions over a compodoc-shaped `doc`, so the tests use small synthetic docs
 * (no ts-morph, no repo). Runs under the `api-docs` vitest project (Node environment).
 */
import { describe, expect, test } from 'vitest';

import {
	assertFullyResolved,
	assertUniqueSlugs,
	attachImportPaths,
	CANONICAL_BASE_URL,
	cleanCell,
	collectDeprecations,
	coverageReport,
	entryPointMeta,
	renderComponentOrDirective,
	renderDeprecations,
	renderEntrypointDoc,
	renderFunction,
	renderInterface,
	renderLlmsFull,
	renderLlmsIndex,
	renderPackageIndex,
	renderPackageLlms,
	renderPackageStories,
	renderStoriesCorpus,
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

	test('attachImportPaths resolves every entry point exporting the owning symbol', () => {
		const deprecations = collectDeprecations(doc, new Set(['OldComponent']));
		const entryPoints = [
			{ importPath: '@lucca-front/ng/legacy', names: new Set(['OldComponent']) },
			{ importPath: '@lucca/prisme/legacy', names: new Set(['OldComponent']) },
			{ importPath: '@lucca-front/ng/other', names: new Set(['Unrelated']) },
		];
		expect(attachImportPaths(deprecations, entryPoints).map((d) => [d.symbol, d.importPaths])).toEqual([
			['OldComponent', ['@lucca-front/ng/legacy', '@lucca/prisme/legacy']],
			['OldComponent.legacy', ['@lucca-front/ng/legacy', '@lucca/prisme/legacy']],
		]);
	});

	test('attachImportPaths leaves an unresolved symbol with an empty list, never guessing', () => {
		const deprecations = [{ symbol: 'Ghost', type: 'class', public: false, message: 'x', replacement: null }];
		expect(attachImportPaths(deprecations, [{ importPath: '@lucca-front/ng/a', names: new Set(['Other']) }])).toEqual([
			{ symbol: 'Ghost', type: 'class', public: false, message: 'x', replacement: null, importPaths: [] },
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

/** One extracted story file, shaped as `extractAllStories` returns it. */
const STORY_FILES = [
	{
		title: 'Documentation/Forms/Button/Basic',
		templates: ['<lu-button>Go</lu-button>'],
		stories: [{ argTypes: [{ name: 'size', description: 'The button size.' }] }],
	},
];

describe('renderPackageLlms', () => {
	const entries = [
		{
			importPath: '@lucca-front/ng/button',
			api: { matched: [{ kind: 'component', entity: { name: 'ButtonComponent', rawdescription: 'A button.' } }] },
		},
		{
			importPath: '@lucca-front/ng/callout',
			api: { matched: [{ kind: 'component', entity: { name: 'CalloutComponent' } }] },
		},
	];
	const out = renderPackageLlms('@lucca-front/ng', entries);

	test('emits the package header with the total entry count', () => {
		expect(out).toMatch(/^# @lucca-front\/ng — LLM API reference$/m);
		expect(out).toMatch(/^Public API entries: 2$/m);
	});

	test('renders one section per entry point with its entities', () => {
		expect(out).toMatch(/^# @lucca-front\/ng\/button — API$/m);
		expect(out).toMatch(/^## ButtonComponent$/m);
		expect(out).toMatch(/^# @lucca-front\/ng\/callout — API$/m);
	});

	test('carries no story content — the stories are a sibling file, not a tail section', () => {
		expect(out).not.toContain('Storybook usage examples');
		expect(out).not.toContain('```html');
	});

	test('is deterministic — identical input yields byte-identical output', () => {
		expect(renderPackageLlms('@lucca-front/ng', [])).toBe(renderPackageLlms('@lucca-front/ng', []));
		expect(renderPackageLlms('@lucca-front/ng', entries)).toBe(renderPackageLlms('@lucca-front/ng', entries));
	});
});

describe('renderPackageStories', () => {
	const out = renderPackageStories('@lucca-front/ng', STORY_FILES);

	test('emits the package-scoped header with the documented-component count', () => {
		expect(out).toMatch(/^# @lucca-front\/ng — Storybook usage examples$/m);
		expect(out).toMatch(/^Documented components: 1$/m);
	});

	test('renders the grouped stories with their templates and prop tables', () => {
		expect(out).toMatch(/^## Forms \/ Button$/m);
		expect(out).toContain('<lu-button>Go</lu-button>');
		expect(out).toContain('`size`');
	});

	test('carries no API content — the API reference is a sibling file', () => {
		expect(out).not.toContain('— API');
		expect(out).not.toContain('Public API entries');
	});

	test('is deterministic — identical input yields byte-identical output', () => {
		expect(renderPackageStories('@lucca-front/ng', STORY_FILES)).toBe(renderPackageStories('@lucca-front/ng', STORY_FILES));
	});
});

describe('renderPackageIndex', () => {
	const out = renderPackageIndex('@lucca-front/ng', [
		{ importPath: '@lucca-front/ng/button', api: { matched: [{ name: 'ButtonComponent' }, { name: 'ButtonModule' }] } },
		{ importPath: '@lucca-front/ng/callout', api: { matched: [{ name: 'CalloutComponent' }] } },
	]);

	test('emits the llmstxt.org shape headed by the package name', () => {
		expect(out).toMatch(/^# @lucca-front\/ng$/m);
		expect(out).toMatch(/^> /m);
	});

	test('points at the corpora shipped in the same tarball with relative links', () => {
		expect(out).toMatch(/\[llms-api\.txt\]\(\.\/llms-api\.txt\)/);
		expect(out).not.toMatch(/\]\(https:\/\/[^)]*llms-api\.txt\)/);
	});

	test('proxies to both corpora, never inlining either, when the tarball carries them', () => {
		const withStories = renderPackageIndex('@lucca-front/ng', [], { storyComponents: 12 });
		expect(withStories).toMatch(/\[llms-stories\.txt\]\(\.\/llms-stories\.txt\)/);
		expect(withStories).not.toContain('```html');
		expect(withStories).toMatch(/^Documented components: 12$/m);
	});

	test('lists every entry point with a sample of its symbols', () => {
		expect(out).toMatch(/`@lucca-front\/ng\/button`.*ButtonComponent/);
		expect(out).toMatch(/`@lucca-front\/ng\/callout`.*CalloutComponent/);
		expect(out).toMatch(/^Public API entries: 3$/m);
	});

	test('links what the tarball does NOT carry to the canonical public deploy', () => {
		expect(out).toContain(`${CANONICAL_BASE_URL}/llms.txt`);
		expect(out).not.toContain('dd.lucca.tech');
	});

	test('announces the stories as a shipped corpus when the tarball carries them', () => {
		const withStories = renderPackageIndex('@lucca-front/ng', [], { storyComponents: 12 });
		expect(withStories).toMatch(/## Corpora \(in this package\)[\s\S]*Storybook usage examples/);
	});

	test('never advertises the stories as absent once the tarball carries them', () => {
		const withStories = renderPackageIndex('@lucca-front/ng', [], { storyComponents: 12 });
		const absent = withStories.slice(withStories.indexOf('## Not in this package'));
		expect(absent).not.toContain('Storybook usage examples');
	});

	test('names only the sources its own corpora carry', () => {
		expect(out).toContain("library's TypeScript source and JSDoc.");
		expect(out).not.toContain('Storybook stories');
		expect(renderPackageIndex('@lucca-front/ng', [], { storyComponents: 12 })).toContain('Storybook stories');
	});

	test('still points at the public deploy for the stories when the tarball has none', () => {
		const absent = out.slice(out.indexOf('## Not in this package'));
		expect(absent).toContain('Storybook usage examples');
	});

	test('is deterministic — identical input yields byte-identical output', () => {
		expect(renderPackageIndex('@lucca-front/ng', [])).toBe(renderPackageIndex('@lucca-front/ng', []));
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

describe('renderStoriesCorpus', () => {
	const storyFiles = [
		{
			title: 'Documentation/Forms/Button/Basic',
			templates: ['<lu-button>Go</lu-button>'],
			stories: [{ argTypes: [{ name: 'size', description: 'The button size.' }] }],
		},
	];
	const out = renderStoriesCorpus(storyFiles);

	test('heads the section so both channels emit the same anchor', () => {
		expect(out).toMatch(/^# Storybook usage examples$/m);
	});

	test('renders the grouped stories under that anchor', () => {
		expect(out).toMatch(/^## Forms \/ Button$/m);
		expect(out).toContain('<lu-button>Go</lu-button>');
		expect(out).toContain('`size`');
	});

	test('is empty for no stories, so a collapsed extraction cannot ship a bare header', () => {
		expect(renderStoriesCorpus([])).toBe('');
	});

	test('is deterministic — identical input yields byte-identical output', () => {
		expect(renderStoriesCorpus(storyFiles)).toBe(renderStoriesCorpus(storyFiles));
	});
});

describe('the deployed index links relatively', () => {
	const out = renderLlmsIndex({
		baseUrl: '.',
		entryPoints: [{ importPath: '@lucca-front/ng/button', slug: 'ng-button', api: { matched: [{ name: 'ButtonComponent' }] } }],
		storyCategories: [{ slug: 'stories-actions', category: 'Actions', components: ['Button'] }],
	});

	test('a versioned deployment resolves its own feeds, not master', () => {
		expect(out).toContain('](./llms/ng-button.md)');
		expect(out).toContain('](./llms/stories-actions.md)');
		expect(out).toContain('](./llms-full.txt)');
		expect(out).not.toContain(CANONICAL_BASE_URL);
	});
});

describe('a union type never opens a table column', () => {
	const row = (markdown, startsWith) =>
		markdown.split('\n').find((line) => line.startsWith(`| \`${startsWith}`) && !line.startsWith('| ---'));

	test('a method argument escapes its pipes', () => {
		const out = renderComponentOrDirective({
			entity: {
				name: 'GuardComponent',
				methodsClass: [
					{
						name: 'callCanDeactivateFn',
						args: [{ name: 'fn', type: 'CanDeactivateFn<C> | DeprecatedGuard' }],
						returnType: 'boolean | void',
					},
				],
			},
		});
		const line = row(out, 'callCanDeactivateFn');
		expect(line).toContain('CanDeactivateFn<C> \\| DeprecatedGuard');
		// Method / Returns / Description, plus the empty ends the outer pipes open.
		expect(line.split(/(?<!\\)\|/).length).toBe(5);
	});
});

describe('renderInterface publishes the method signatures', () => {
	const out = renderInterface({
		entity: {
			name: 'ILuPopupRef',
			properties: [{ name: 'result', type: 'string' }],
			methodsClass: [
				{ name: 'open', args: [{ name: 'config?', type: 'string' }], returnType: 'void' },
				{ name: 'dismiss', args: [], returnType: 'void', optional: true },
			],
		},
	});

	test('methods land in their own table, under a heading that separates them from the properties', () => {
		expect(out).toContain('### Properties');
		expect(out).toContain('### Methods');
		expect(out).toContain('| `open(config?: string)` |');
		expect(out).toContain('| `dismiss?()` |');
	});
});

test('renderComponentOrDirective declares a generic class with its type parameters', () => {
	const out = renderComponentOrDirective({
		entity: {
			name: 'ALuPopupRef',
			typeParameters: ['T = unknown', 'D = unknown'],
			inputsClass: [],
			outputsClass: [],
			methodsClass: [{ name: 'close', args: [{ name: 'result', type: 'D' }], returnType: 'void' }],
		},
	});
	expect(out).toContain('```ts\nclass ALuPopupRef<T = unknown, D = unknown>\n```');
});

test('renderComponentOrDirective emits no declaration fence for a non-generic class', () => {
	const out = renderComponentOrDirective({ entity: { name: 'ButtonComponent', inputsClass: [], outputsClass: [], methodsClass: [] } });
	expect(out).not.toContain('```ts');
});

test('renderInterface fences a template-literal type so its backticks survive the table', () => {
	const out = renderInterface({
		entity: { name: 'Themed', properties: [{ name: 'class', type: '`palette-${Palette}` | string', optional: true }], methodsClass: [] },
	});
	expect(out).toContain('| `class?` | `` `palette-${Palette}` \\| string `` |');
});

describe('class members carrying a modifier or a generic signature', () => {
	const out = renderComponentOrDirective({
		entity: {
			name: 'Formatter',
			inputsClass: [],
			outputsClass: [],
			properties: [{ name: 'changes$', type: 'Subject<string>', rawdescription: 'The stream.' }],
			methodsClass: [
				{ name: 'format', args: [{ name: 'value', type: 'string' }], returnType: 'string', static: true },
				{ name: 'open', args: [{ name: 'data', type: 'D' }], returnType: 'D', typeParameters: ['T', 'D'] },
			],
		},
	});

	test('a static method reads as static', () => {
		expect(out).toContain('| `static format(value: string)` |');
	});

	test('a generic method declares its type parameters', () => {
		expect(out).toContain('| `open<T, D>(data: D)` |');
	});

	test('public properties get their own table', () => {
		expect(out).toContain('### Properties');
		expect(out).toContain('| `changes$` | `Subject<string>` | The stream. |');
	});
});

test('the compiler-only template context guard is not a callable method', () => {
	const out = renderComponentOrDirective({
		entity: {
			name: 'Guarded',
			inputsClass: [],
			outputsClass: [],
			methodsClass: [
				{ name: 'ngTemplateContextGuard', args: [], returnType: 'boolean', static: true },
				{ name: 'focus', args: [], returnType: 'void' },
			],
		},
	});
	expect(out).not.toContain('ngTemplateContextGuard');
	expect(out).toContain('focus()');
});

describe('metadata a template author needs', () => {
	test('a pipe renders the name it is piped through', () => {
		const out = renderComponentOrDirective({
			entity: { name: 'LuDatePipe', pipeName: 'luDate', inputsClass: [], outputsClass: [], methodsClass: [] },
		});
		expect(out).toContain('**Pipe:** `value | luDate`');
	});

	test('a directive renders its exportAs handle', () => {
		const out = renderComponentOrDirective({
			entity: {
				name: 'TriggerDirective',
				selector: '[luTrigger]',
				exportAs: 'luTrigger',
				inputsClass: [],
				outputsClass: [],
				methodsClass: [],
			},
		});
		expect(out).toContain('**Exported as:** `luTrigger`');
	});

	test('a class renders the constructor a consumer must call', () => {
		const out = renderComponentOrDirective({
			entity: {
				name: 'StringDateAdapter',
				constructorArgs: [{ name: 'locale', type: 'string' }],
				inputsClass: [],
				outputsClass: [],
				methodsClass: [],
			},
		});
		expect(out).toContain('```ts\nnew StringDateAdapter(locale: string)\n```');
	});
});

describe('a name that resolves to two distinct exports', () => {
	const doc = docWith({
		components: [
			{
				name: 'LinkComponent',
				sourceFile: '/repo/packages/ng/link/link.component.ts',
				inputsClass: [],
				outputsClass: [],
				methodsClass: [],
			},
			{
				name: 'LinkComponent',
				sourceFile: '/repo/packages/ng/forms/rich-text-input/link.component.ts',
				inputsClass: [],
				outputsClass: [],
				methodsClass: [],
			},
		],
	});
	const entryPoints = [
		{ importPath: '@lucca-front/ng/link', barrel: '/repo/packages/ng/link/index.ts' },
		{ importPath: '@lucca-front/ng/forms/rich-text-input', barrel: '/repo/packages/ng/forms/rich-text-input/index.ts' },
	];
	const api = selectPublicApi(doc, new Set(['LinkComponent']), entryPoints);

	test('both declarations are selected, not just the first', () => {
		expect(api.matched.length).toBe(2);
	});

	test('each one carries the import path that tells them apart', () => {
		expect(api.matched.map((e) => e.importPath).sort()).toEqual(['@lucca-front/ng/forms/rich-text-input', '@lucca-front/ng/link']);
	});

	test('the full corpus states the import path under the shared heading', () => {
		const out = renderLlmsFull(api);
		expect(out).toContain('## LinkComponent\n\n**Import:** `@lucca-front/ng/link`');
		expect(out).toContain('**Import:** `@lucca-front/ng/forms/rich-text-input`');
	});
});

describe('the whole-surface guarantee', () => {
	test('an unresolved public export fails generation instead of vanishing', () => {
		expect(() => assertFullyResolved({ matched: [], unmatched: ['SomeNewExport'] })).toThrow(/SomeNewExport/);
	});

	test('a fully resolved surface passes', () => {
		expect(() => assertFullyResolved({ matched: [{ name: 'A' }], unmatched: [] })).not.toThrow();
	});
});

describe('a deprecation on one of two same-named declarations', () => {
	const CORE = '/repo/packages/ng/core-select/input/select-input.component.ts';
	const SELECT = '/repo/packages/ng/select/input/select-input.component.ts';
	const SHARED = '/repo/packages/prisme/button/button.component.ts';
	const entryPoints = [
		{
			importPath: '@lucca-front/ng/core-select',
			names: new Set(['ALuSelectInputComponent']),
			doc: docWith({ components: [{ name: 'ALuSelectInputComponent', sourceFile: CORE }] }),
		},
		{
			importPath: '@lucca-front/ng/select',
			names: new Set(['ALuSelectInputComponent']),
			doc: docWith({ components: [{ name: 'ALuSelectInputComponent', sourceFile: SELECT }] }),
		},
		{
			importPath: '@lucca-front/ng/button',
			names: new Set(['ButtonComponent']),
			doc: docWith({ components: [{ name: 'ButtonComponent', sourceFile: SHARED }] }),
		},
		{
			importPath: '@lucca/prisme/button',
			names: new Set(['ButtonComponent']),
			doc: docWith({ components: [{ name: 'ButtonComponent', sourceFile: SHARED }] }),
		},
	];

	test('names only the entry point whose declaration carries it', () => {
		const [dep] = attachImportPaths([{ symbol: 'ALuSelectInputComponent.grouping', type: 'input', sourceFile: CORE }], entryPoints);
		expect(dep.importPaths).toEqual(['@lucca-front/ng/core-select']);
	});

	test('a re-exported declaration still names every entry point it reaches', () => {
		const [dep] = attachImportPaths([{ symbol: 'ButtonComponent.delete', type: 'input', sourceFile: SHARED }], entryPoints);
		expect(dep.importPaths).toEqual(['@lucca-front/ng/button', '@lucca/prisme/button']);
	});

	test('the published manifest never carries a machine path', () => {
		const attached = attachImportPaths([{ symbol: 'ALuSelectInputComponent.grouping', type: 'input', sourceFile: CORE }], entryPoints);
		expect(renderDeprecations(attached)).not.toContain('/repo/packages');
	});
});

describe('rendering a signature inside a code fence', () => {
	test('a constructor union keeps its pipe unescaped', () => {
		const out = renderComponentOrDirective({
			entity: {
				name: 'LuDialogRef',
				constructorArgs: [{ name: 'value', type: 'string | Date' }],
				inputsClass: [],
				outputsClass: [],
				methodsClass: [],
			},
		});
		expect(out).toContain('new LuDialogRef(value: string | Date)');
		expect(out).not.toContain('\\|');
	});

	test('a method union in the table still escapes its pipe', () => {
		const out = renderComponentOrDirective({
			entity: {
				name: 'X',
				inputsClass: [],
				outputsClass: [],
				methodsClass: [{ name: 'set', args: [{ name: 'v', type: 'string | Date' }], returnType: 'void' }],
			},
		});
		expect(out).toContain('`set(v: string \\| Date)`');
	});
});

test('two entry points that would share a slug are refused, not silently merged', () => {
	expect(() =>
		assertUniqueSlugs([
			{ slug: 'ng-core-select', importPath: '@lucca-front/ng/core/select' },
			{ slug: 'ng-core-select', importPath: '@lucca-front/ng/core-select' },
		]),
	).toThrow(/ng-core-select/);
	expect(() =>
		assertUniqueSlugs([
			{ slug: 'ng-a', importPath: 'a' },
			{ slug: 'ng-b', importPath: 'b' },
		]),
	).not.toThrow();
});
