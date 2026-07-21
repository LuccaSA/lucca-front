// @ts-check
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import {
	cleanBlock,
	cleanCell,
	collectDeprecations,
	collectExportedNames,
	coverageReport,
	indexEntities,
	parseExportedNames,
	renderComponentOrDirective,
	renderDeprecations,
	renderFunction,
	renderInterface,
	renderLlmsFull,
	renderTypeAlias,
	renderVariable,
	replacementFrom,
	selectPublicApi,
} from './generate-llms.mjs';

describe('parseExportedNames', () => {
	it('collects value, type and aliased names from an export block', () => {
		const src = `export { FooComponent, provideFoo, type FooConfig, Bar as Baz } from './foo';`;
		expect([...parseExportedNames(src)].sort()).toEqual(['Baz', 'FooComponent', 'FooConfig', 'provideFoo']);
	});

	it('collects `export type { ... }` and inline declarations', () => {
		const src = `export type { A, B } from './x';\nexport const TOKEN = 1;\nexport function helper() {}\nexport interface Shape {}`;
		expect([...parseExportedNames(src)].sort()).toEqual(['A', 'B', 'Shape', 'TOKEN', 'helper']);
	});

	it('ignores `export * from` (walked separately, not by name)', () => {
		expect([...parseExportedNames(`export * from './a';\nexport * from '@lucca/prisme/button';`)]).toEqual([]);
	});
});

describe('collectExportedNames — export-* graph resolution', () => {
	let dir;
	beforeAll(() => {
		dir = mkdtempSync(join(tmpdir(), 'llms-graph-'));
		mkdirSync(dir, { recursive: true });
		writeFileSync(
			join(dir, 'barrel.ts'),
			`export * from './a';\nexport { Named } from './b';\nexport const INLINE = 1;\nexport * from '@lucca/prisme/button';\n`,
		);
		writeFileSync(join(dir, 'a.ts'), `export class AComp {}\nexport * from './nested/index';\n`);
		writeFileSync(join(dir, 'b.ts'), `export const Named = 2;\n`);
		mkdirSync(join(dir, 'nested'), { recursive: true });
		writeFileSync(join(dir, 'nested', 'index.ts'), `export function nestedFn() {}\n`);
	});
	afterAll(() => rmSync(dir, { recursive: true, force: true }));

	it('follows local `export *` recursively and skips external packages', () => {
		const names = collectExportedNames(join(dir, 'barrel.ts'));
		expect([...names].sort()).toEqual(['AComp', 'INLINE', 'Named', 'nestedFn']);
	});

	it('guards against re-reading a module twice (cycle-safe via shared seen)', () => {
		const seen = new Set();
		collectExportedNames(join(dir, 'barrel.ts'), { seen });
		// Re-walking with the same seen set yields nothing new (every file already visited).
		expect([...collectExportedNames(join(dir, 'barrel.ts'), { seen })]).toEqual([]);
	});
});

describe('cleanCell / cleanBlock', () => {
	// Data-driven: identical-structure text-cleaning cases (house rule: table for >= 2).
	it.each([
		['strips HTML tags', '<p>Hello <strong>world</strong></p>', 'Hello world'],
		['decodes entities', 'a &amp; b &#39;c&#39;', "a & b 'c'"],
		['restores the blank-line placeholder token', 'a___COMPODOC_EMPTY_LINE___b', 'a b'],
		['truncates at a real @default tag', "Color theme. @default 'product'", 'Color theme.'],
		['truncates at a fenced code block', 'Summary. ```ts\ncode\n```', 'Summary.'],
		['keeps an inline `@deprecated` reference wrapped in backticks', 'See its `@deprecated` note', 'See its `@deprecated` note'],
		['reduces {@link X} to X', 'use {@link withSelection} on top', 'use withSelection on top'],
		['escapes pipes so tables cannot break', 'a | b | c', 'a \\| b \\| c'],
	])('%s', (_label, input, expected) => {
		expect(cleanCell(input)).toBe(expected);
	});

	it('tolerates missing descriptions', () => {
		expect(cleanCell(undefined)).toBe('');
		expect(cleanBlock(null)).toBe('');
	});

	it('keeps paragraph breaks in block mode', () => {
		expect(cleanBlock('Line one.\n\nLine two.')).toBe('Line one.\n\nLine two.');
	});
});

describe('indexEntities', () => {
	it('tags each entity with its kind and keeps the first writer on name clash', () => {
		const doc = {
			components: [{ name: 'C' }],
			pipes: [{ name: 'P' }],
			interfaces: [{ name: 'I' }],
			miscellaneous: { functions: [{ name: 'f' }], typealiases: [{ name: 'T' }], variables: [{ name: 'C' }] },
		};
		const map = indexEntities(doc);
		expect(map.get('C')?.kind).toBe('component');
		expect(map.get('P')?.kind).toBe('pipe');
		expect(map.get('I')?.kind).toBe('interface');
		expect(map.get('f')?.kind).toBe('function');
		expect(map.get('T')?.kind).toBe('typealias');
	});
});

describe('renderComponentOrDirective', () => {
	const entity = {
		name: 'LuActivityFeedItemComponent',
		selector: 'li[lu-activity-feed-item]',
		rawdescription: 'Individual item within an activity feed.',
		inputsClass: [
			{ name: 'type', type: '"comment" | "event"', defaultValue: "'event'", required: false, rawdescription: 'Display type.' },
			{ name: 'heading', type: 'string', required: true, rawdescription: 'Heading text.' },
		],
		outputsClass: [{ name: 'closed', type: 'EventEmitter<void>', rawdescription: 'Emitted on close.' }],
		methodsClass: [
			{ name: 'ngOnInit', modifierKind: [] },
			{ name: 'focus', modifierKind: [], returnType: 'void', args: [] },
			{ name: 'internal', modifierKind: [123], returnType: 'void', args: [] },
		],
	};

	const out = renderComponentOrDirective({ entity });

	it('renders the heading, description and selector', () => {
		expect(out).toContain('## LuActivityFeedItemComponent');
		expect(out).toContain('Individual item within an activity feed.');
		expect(out).toContain('**Selector:** `li[lu-activity-feed-item]`');
	});

	it('renders inputs alpha-sorted with type, default and required columns', () => {
		const headingIdx = out.indexOf('| `heading`');
		const typeIdx = out.indexOf('| `type`');
		expect(headingIdx).toBeGreaterThan(-1);
		expect(headingIdx).toBeLessThan(typeIdx);
		expect(out).toContain('| `heading` | `string` | — | yes | Heading text. |');
		expect(out).toContain('| `type` | `"comment" \\| "event"` | `\'event\'` | no | Display type. |');
	});

	it('renders outputs and public non-lifecycle methods only', () => {
		expect(out).toContain('### Outputs');
		expect(out).toContain('| `closed` | `EventEmitter<void>` | Emitted on close. |');
		expect(out).toContain('`focus()`');
		expect(out).not.toContain('ngOnInit'); // lifecycle filtered out
		expect(out).not.toContain('internal'); // private (modifierKind 123) filtered out
	});
});

describe('renderFunction / renderInterface / renderTypeAlias / renderVariable', () => {
	it('renders a function signature with type parameters and args', () => {
		const out = renderFunction({
			entity: {
				name: 'withSelection',
				typeParameters: ['TId'],
				args: [{ name: 'config', type: 'Config' }],
				returnType: 'void',
				rawdescription: 'A feature.',
			},
		});
		expect(out).toContain('## withSelection()');
		expect(out).toContain('function withSelection<TId>(config: Config): void');
	});

	it('renders an interface property table', () => {
		const out = renderInterface({
			entity: {
				name: 'Selection',
				properties: [
					{ name: 'ids', type: 'TId[]', rawdescription: 'The ids.' },
					{ name: 'mode', type: 'string', optional: true },
				],
			},
		});
		expect(out).toContain('## Selection');
		expect(out).toContain('| `ids` | `TId[]` | The ids. |');
		expect(out).toContain('| `mode?` | `string` |  |');
	});

	it('renders a type alias but omits an unresolved `unknown` body', () => {
		expect(renderTypeAlias({ entity: { name: 'EntityStatus', rawtype: '"idle" | "loaded"', rawdescription: 'Status.' } })).toContain(
			'type EntityStatus = "idle" | "loaded"',
		);
		expect(renderTypeAlias({ entity: { name: 'AppIcon', rawtype: 'unknown', rawdescription: 'Icon.' } })).not.toContain('type AppIcon');
	});

	it('renders a variable (InjectionToken) with its type', () => {
		const out = renderVariable({ entity: { name: 'LU_DIALOG_CONFIG', type: 'InjectionToken<Config>', rawdescription: 'DI token.' } });
		expect(out).toContain('## LU_DIALOG_CONFIG');
		expect(out).toContain('const LU_DIALOG_CONFIG: InjectionToken<Config>');
	});
});

describe('selectPublicApi', () => {
	const doc = { components: [{ name: 'FooComponent' }], miscellaneous: { functions: [{ name: 'helper' }] } };

	it('returns matched entities alpha-sorted and reports unmatched names', () => {
		const { matched, unmatched } = selectPublicApi(doc, new Set(['helper', 'FooComponent', 'Ghost']));
		expect(matched.map((m) => m.name)).toEqual(['FooComponent', 'helper']);
		expect(unmatched).toEqual(['Ghost']);
	});
});

describe('coverageReport', () => {
	const doc = {
		components: [{ name: 'Documented', rawdescription: 'A described component.' }, { name: 'Bare' }],
		miscellaneous: { functions: [{ name: 'helper', description: '<p>Has a description.</p>' }] },
	};

	it('counts only public exports present in the extraction that carry a description', () => {
		const r = coverageReport(doc, new Set(['Documented', 'Bare', 'helper']));
		expect(r).toEqual({ total: 3, documented: 2, coverage: 67, missing: ['Bare'], external: [] });
	});

	it('excludes names absent from the extraction (external re-exports) from the denominator', () => {
		const r = coverageReport(doc, new Set(['Documented', 'Ghost']));
		expect(r).toEqual({ total: 1, documented: 1, coverage: 100, missing: [], external: ['Ghost'] });
	});

	it('reports 100% for an empty public surface (nothing to document)', () => {
		expect(coverageReport(doc, new Set()).coverage).toBe(100);
	});
});

describe('replacementFrom', () => {
	it.each([
		['use `LuSafeHtmlPipe` instead', 'LuSafeHtmlPipe'],
		['use `LuDropdownTriggerDirective, LuDropdownPanelComponent` instead', 'LuDropdownTriggerDirective, LuDropdownPanelComponent'],
		['no backticked replacement here', null],
		['', null],
	])('extracts the backticked replacement from %j', (message, expected) => {
		expect(replacementFrom(message)).toBe(expected);
	});
});

describe('collectDeprecations', () => {
	const doc = {
		components: [
			{
				name: 'LuOldComponent',
				deprecated: true,
				deprecationMessage: 'use `LuNewComponent` instead',
				inputsClass: [{ name: 'legacyInput', deprecated: true, deprecationMessage: 'use `newInput` instead' }],
			},
			{ name: 'LuFineComponent' },
		],
		modules: [{ name: 'LuSafeContentModule', deprecated: true, deprecationMessage: 'use `LuSafeHtmlPipe` instead' }],
		miscellaneous: { functions: [{ name: 'oldHelper', deprecated: true, deprecationMessage: '' }] },
	};

	it('collects entity- and member-level deprecations, alpha-sorted, with replacement + public flag', () => {
		const deps = collectDeprecations(doc, new Set(['LuOldComponent', 'LuSafeContentModule']));
		expect(deps).toEqual([
			{ symbol: 'LuOldComponent', type: 'component', public: true, message: 'use `LuNewComponent` instead', replacement: 'LuNewComponent' },
			{ symbol: 'LuOldComponent.legacyInput', type: 'input', public: true, message: 'use `newInput` instead', replacement: 'newInput' },
			{
				symbol: 'LuSafeContentModule',
				type: 'module',
				public: true,
				message: 'use `LuSafeHtmlPipe` instead',
				replacement: 'LuSafeHtmlPipe',
			},
			{ symbol: 'oldHelper', type: 'function', public: false, message: '', replacement: null },
		]);
	});

	it('ignores non-deprecated symbols', () => {
		const deps = collectDeprecations({ components: [{ name: 'LuFineComponent' }] });
		expect(deps).toEqual([]);
	});
});

describe('renderLlmsFull — determinism', () => {
	const doc = {
		components: [
			{ name: 'BComponent', selector: 'b' },
			{ name: 'AComponent', selector: 'a' },
		],
		miscellaneous: { functions: [{ name: 'zzz', args: [], returnType: 'void' }] },
	};
	const api = selectPublicApi(doc, new Set(['BComponent', 'AComponent', 'zzz']));

	it('emits the header and entry count', () => {
		const out = renderLlmsFull(api);
		expect(out.startsWith('# @lucca-front/ng — LLM API reference')).toBe(true);
		expect(out).toContain('Public API entries: 3');
	});

	it('is byte-identical across repeated renders (no volatile data)', () => {
		expect(renderLlmsFull(api)).toBe(renderLlmsFull(api));
	});

	it('orders sections alpha regardless of source order', () => {
		const out = renderLlmsFull(api);
		expect(out.indexOf('## AComponent')).toBeLessThan(out.indexOf('## BComponent'));
	});
});

describe('renderDeprecations', () => {
	it('serialises a stable, newline-terminated JSON manifest', () => {
		const out = renderDeprecations([{ symbol: 'X', type: 'component', public: true, message: 'use `Y`', replacement: 'Y' }]);
		expect(out.endsWith('\n')).toBe(true);
		const parsed = JSON.parse(out);
		expect(parsed).toEqual({
			package: '@lucca-front/ng',
			count: 1,
			deprecations: [{ symbol: 'X', type: 'component', public: true, message: 'use `Y`', replacement: 'Y' }],
		});
	});
});
