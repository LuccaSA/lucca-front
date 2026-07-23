/**
 * Unit tests for the ts-morph extraction front-end. Behaviour is exercised through
 * the public entry point (`extractDoc`) over in-memory sources — no fixture files,
 * no repo checkout — so the tests assert what the surface looks like, not how it is
 * computed. Runs under the `api-docs` vitest project (Node environment).
 */
import { describe, expect, test } from 'vitest';

import { Project } from 'ts-morph';

import { extractDoc } from './extract-api.mjs';

/** Build a `doc` from one or more in-memory sources; extraction runs on `index.ts`. */
function docFrom(files) {
	const project = new Project({ useInMemoryFileSystem: true });
	let index;
	for (const [name, code] of Object.entries(files)) {
		const sf = project.createSourceFile(name, code);
		if (name === 'index.ts') index = sf;
	}
	return extractDoc(index);
}

const COMPONENT = `
  import { Component, input, output, model } from '@angular/core';
  /** A demo callout. */
  @Component({ selector: 'lu-demo', template: '' })
  export class DemoComponent {
    /** The title. */
    readonly heading = input<string>();
    readonly size = input.required<'s' | 'm'>();
    readonly opened = model<boolean>(false);
    readonly closed = output<void>();
    ngOnInit(): void {}
    /** Toggle it. */
    open(force = false): void {}
    private secret(): void {}
  }
`;

describe('component extraction', () => {
	const { doc } = docFrom({ 'index.ts': COMPONENT });
	const comp = doc.components[0];

	test('classifies @Component into the components bucket with its selector', () => {
		expect(doc.components.length).toBe(1);
		expect(comp.name).toBe('DemoComponent');
		expect(comp.selector).toBe('lu-demo');
		expect(comp.rawdescription).toBe('A demo callout.');
	});

	test('reads signal inputs: name, resolved type, required flag, default and description', () => {
		const byName = Object.fromEntries(comp.inputsClass.map((i) => [i.name, i]));
		expect(byName.heading.type).toBe('string');
		expect(byName.heading.required).toBe(false);
		expect(byName.heading.rawdescription).toBe('The title.');
		expect(byName.size.type).toBe("'s' | 'm'");
		expect(byName.size.required).toBe(true);
		expect(byName.opened.type).toBe('boolean');
		expect(byName.opened.defaultValue).toBe('false');
	});

	test('reads outputs and excludes private methods from the surface', () => {
		expect(comp.outputsClass.map((o) => o.name)).toEqual(['closed']);
		const methodNames = comp.methodsClass.map((m) => m.name);
		expect(methodNames).toContain('open');
		expect(methodNames).not.toContain('secret');
		const open = comp.methodsClass.find((m) => m.name === 'open');
		expect(open.args).toEqual([{ name: 'force?', type: 'boolean' }]);
	});
});

describe('kind classification', () => {
	const cases = [
		{
			label: 'directive',
			code: `import {Directive} from '@angular/core'; @Directive({selector:'[x]'}) export class D {}`,
			bucket: 'directives',
			name: 'D',
		},
		{
			label: 'injectable',
			code: `import {Injectable} from '@angular/core'; @Injectable() export class S {}`,
			bucket: 'injectables',
			name: 'S',
		},
		{
			label: 'pipe (folded into injectables)',
			code: `import {Pipe} from '@angular/core'; @Pipe({name:'p'}) export class P {}`,
			bucket: 'injectables',
			name: 'P',
		},
		{ label: 'plain class', code: `export class C {}`, bucket: 'classes', name: 'C' },
		{ label: 'interface', code: `export interface I { a: string }`, bucket: 'interfaces', name: 'I' },
	];
	test.each(cases)('$label', ({ code, bucket, name }) => {
		const { doc } = docFrom({ 'index.ts': code });
		expect(doc[bucket].map((e) => e.name)).toEqual([name]);
	});
});

describe('miscellaneous kinds', () => {
	const { doc } = docFrom({
		'index.ts': `
      export type Id<T> = T & { __brand: 'id' };
      export enum Color { Red = 'red', Blue = 'blue' }
      export const TOKEN: string = 'x';
      export function make(a: string): number;
      export function make(a: number): number;
      export function make(a: any): number { return 0; }
    `,
	});

	test('type alias captures type parameters and raw type', () => {
		const t = doc.miscellaneous.typealiases[0];
		expect(t.name).toBe('Id');
		expect(t.typeParameters).toEqual(['T']);
		expect(t.rawtype).toBe("T & { __brand: 'id' }");
	});

	test('enumeration captures members and values', () => {
		expect(doc.miscellaneous.enumerations[0].members).toEqual([
			{ name: 'Red', value: 'red' },
			{ name: 'Blue', value: 'blue' },
		]);
	});

	test('variable captures its declared type', () => {
		expect(doc.miscellaneous.variables[0].type).toBe('string');
	});

	test('function keeps every overload signature (not the implementation)', () => {
		const f = doc.miscellaneous.functions[0];
		expect(f.name).toBe('make');
		expect(f.signatures.length).toBe(2);
		expect(f.signatures[0].args).toEqual([{ name: 'a', type: 'string' }]);
		expect(f.signatures[1].args).toEqual([{ name: 'a', type: 'number' }]);
	});
});

describe('interface properties', () => {
	const { doc } = docFrom({
		'index.ts': `export interface Cfg {
      /** The id. */ readonly id: string;
      name?: string;
    }`,
	});
	const props = Object.fromEntries(doc.interfaces[0].properties.map((p) => [p.name, p]));

	test('captures readonly, optional and description', () => {
		expect(props.id.readonly).toBe(true);
		expect(props.id.optional).toBe(false);
		expect(props.id.rawdescription).toBe('The id.');
		expect(props.name.optional).toBe(true);
		expect(props.name.readonly).toBe(false);
	});
});

describe('export * re-exports are followed', () => {
	const { doc, names } = docFrom({
		'button.ts': `export class ButtonComponent {}`,
		'index.ts': `export * from './button'; export interface Local { a: string }`,
	});

	test('symbols re-exported through a wildcard are in the surface', () => {
		expect(names.has('ButtonComponent')).toBe(true);
		expect(names.has('Local')).toBe(true);
		expect(doc.classes.map((c) => c.name)).toEqual(['ButtonComponent']);
	});
});

describe('deprecation capture', () => {
	const { doc } = docFrom({
		'index.ts': `
      import { Component, input } from '@angular/core';
      /** @deprecated use \`NewComponent\` instead */
      @Component({ selector: 'x', template: '' })
      export class OldComponent {
        /** @deprecated */ readonly legacy = input<string>();
        readonly kept = input<string>();
      }
    `,
	});
	const c = doc.components[0];

	test('entity-level @deprecated is captured with its message', () => {
		expect(c.deprecated).toBe(true);
		expect(c.deprecationMessage).toBe('use `NewComponent` instead');
	});

	test('member-level @deprecated is captured only on the deprecated member', () => {
		const legacy = c.inputsClass.find((i) => i.name === 'legacy');
		const kept = c.inputsClass.find((i) => i.name === 'kept');
		expect(legacy.deprecated).toBe(true);
		expect(kept.deprecated).toBeUndefined();
	});
});

describe('determinism', () => {
	test('buckets are alpha-sorted regardless of source declaration order', () => {
		const { doc } = docFrom({ 'index.ts': `export class Zebra {} export class Apple {} export class Mango {}` });
		expect(doc.classes.map((c) => c.name)).toEqual(['Apple', 'Mango', 'Zebra']);
	});
});
