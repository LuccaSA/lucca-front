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
		expect(comp.outputsClass.map((o) => o.name)).toEqual(['openedChange', 'closed']);
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

describe('decorator-based inputs and outputs', () => {
	const { doc } = docFrom({
		'index.ts': `
      import { Component, Input, Output, EventEmitter } from '@angular/core';
      import { outputFromObservable } from '@angular/core/rxjs-interop';
      @Component({ selector: 'lu-legacy', template: '' })
      export class LegacyComponent {
        /** Minimum value. */
        @Input() min?: string;
        @Input() granularity: string = 'day';
        @Input({ required: true }) mandatory!: number;
        @Input('luAlias') set panel(p: number) {}
        /** Emitted on close. */
        @Output() closed = new EventEmitter<void>();
        @Output('luDone') done = new EventEmitter<string>();
        ridden = outputFromObservable<boolean>(undefined);
      }
    `,
	});
	const byName = Object.fromEntries(doc.components[0].inputsClass.map((i) => [i.name, i]));
	const outs = Object.fromEntries(doc.components[0].outputsClass.map((o) => [o.name, o]));

	test('reads @Input() properties: type, default, required flag and description', () => {
		expect(byName.min).toMatchObject({ type: 'string', required: false, rawdescription: 'Minimum value.' });
		expect(byName.granularity.defaultValue).toBe("'day'");
		expect(byName.mandatory.required).toBe(true);
	});

	test('a decorator alias is the public input name, setters included', () => {
		expect(byName.luAlias.type).toBe('number');
		expect(byName.panel).toBeUndefined();
	});

	test('reads @Output() EventEmitter properties with their payload type and alias', () => {
		expect(outs.closed).toMatchObject({ type: 'void', rawdescription: 'Emitted on close.' });
		expect(outs.luDone.type).toBe('string');
		expect(outs.done).toBeUndefined();
	});

	test('reads outputFromObservable() with its written payload type', () => {
		expect(outs.ridden.type).toBe('boolean');
	});
});

describe('signal-factory aliases', () => {
	const { doc } = docFrom({
		'index.ts': `
      import { Component, input, model, output } from '@angular/core';
      import { outputFromObservable } from '@angular/core/rxjs-interop';
      @Component({ selector: 'lu-signal', template: '' })
      export class SignalComponent {
        /** The placeholder. */
        readonly placeHolderInput = input<string>('', { alias: 'placeholder' });
        readonly sizeInput = input.required<'s' | 'm'>({ alias: 'size' });
        readonly openedModel = model<boolean>(false, { alias: 'opened' });
        readonly doneOutput = output<string>({ alias: 'done' });
        readonly closeOutput = outputFromObservable<void>(undefined, { alias: 'close' });
        readonly plain = input<number>(1);
      }
    `,
	});
	const ins = Object.fromEntries(doc.components[0].inputsClass.map((i) => [i.name, i]));
	const outs = Object.fromEntries(doc.components[0].outputsClass.map((o) => [o.name, o]));

	test('input()/input.required()/model() publish the alias, not the property name', () => {
		expect(Object.keys(ins).sort()).toEqual(['opened', 'placeholder', 'plain', 'size']);
		expect(ins.placeHolderInput).toBeUndefined();
	});

	test('an aliased input keeps its type, default and required flag', () => {
		expect(ins.placeholder).toMatchObject({ type: 'string', required: false, rawdescription: 'The placeholder.' });
		expect(ins.placeholder.defaultValue).toBe("''");
		expect(ins.size.required).toBe(true);
	});

	test('output()/outputFromObservable() publish the alias, not the property name', () => {
		expect(Object.keys(outs).sort()).toEqual(['close', 'done', 'openedChange']);
		expect(outs.done.type).toBe('string');
	});

	test("model() also publishes <publicName>Change, built on the alias and the model's value type", () => {
		expect(outs.openedChange).toMatchObject({ type: 'boolean' });
		expect(outs.openedModelChange).toBeUndefined();
	});
});

describe('method overloads', () => {
	const { doc } = docFrom({
		'index.ts': `
      export class GroupPipe {
        transform(value: string): string;
        transform(value: number): number;
        transform(value: unknown): unknown { return value; }
      }
    `,
	});

	test('keeps every overload declaration and drops the implementation signature', () => {
		const transforms = doc.classes[0].methodsClass.filter((m) => m.name === 'transform');
		expect(transforms.map((m) => m.returnType)).toEqual(['string', 'number']);
	});
});

describe('inherited Angular members', () => {
	const { doc } = docFrom({
		'index.ts': `
      import { Component, Directive, input, output } from '@angular/core';
      @Directive()
      export abstract class BasePicker {
        /** Base step. */
        readonly step = input<number>(1);
        readonly baseChanged = output<void>();
        publicOnBase(): void {}
      }
      @Component({ selector: 'lu-picker', template: '' })
      export class PickerComponent extends BasePicker {
        readonly step = input<number>(5);
        readonly own = input<string>('');
        ownMethod(): void {}
      }
    `,
	});
	const picker = doc.components.find((c) => c.name === 'PickerComponent');

	test('a base class contributes its inputs, outputs and public methods', () => {
		expect(picker.inputsClass.map((i) => i.name).sort()).toEqual(['own', 'step']);
		expect(picker.outputsClass.map((o) => o.name)).toContain('baseChanged');
		expect(picker.methodsClass.map((m) => m.name).sort()).toEqual(['ownMethod', 'publicOnBase']);
	});

	test('the derived declaration wins over the inherited one of the same name', () => {
		expect(picker.inputsClass.find((i) => i.name === 'step').defaultValue).toBe('5');
	});
});

describe('host directives', () => {
	const { doc } = docFrom({
		'index.ts': `
      import { Component, Directive, input, output } from '@angular/core';
      @Directive({ selector: '[luDropdown]' })
      export class DropdownDirective {
        /** Where the panel opens. */
        readonly position = input<'top' | 'bottom'>('bottom');
        readonly opened = output<void>();
        readonly untouched = input<string>('');
      }
      @Component({
        selector: 'lu-trigger',
        template: '',
        hostDirectives: [{ directive: DropdownDirective, inputs: ['position: luDropdownPosition'], outputs: ['opened'] }],
      })
      export class TriggerComponent {}
    `,
	});
	const trigger = doc.components.find((c) => c.name === 'TriggerComponent');

	test('a forwarded binding is published under its alias, with the source directive type', () => {
		const position = trigger.inputsClass.find((i) => i.name === 'luDropdownPosition');
		expect(position).toMatchObject({ type: "'top' | 'bottom'", rawdescription: 'Where the panel opens.' });
		expect(trigger.outputsClass.map((o) => o.name)).toEqual(['opened']);
	});

	test('a binding the host does not forward stays off its surface', () => {
		expect(trigger.inputsClass.map((i) => i.name)).not.toContain('untouched');
	});
});

describe('interface methods', () => {
	const { doc } = docFrom({
		'index.ts': `
      export interface ILuPopupRef {
        /** The current result. */
        readonly result: string;
        open(config?: string): void;
        dismiss(): void;
      }
    `,
	});

	test('method signatures reach the surface alongside the properties', () => {
		const iface = doc.interfaces[0];
		expect(iface.methodsClass.map((m) => m.name)).toEqual(['open', 'dismiss']);
		expect(iface.methodsClass[0].args).toEqual([{ name: 'config?', type: 'string' }]);
		expect(iface.properties.map((p) => p.name)).toEqual(['result']);
	});
});

describe('transformed signal inputs', () => {
	const { doc } = docFrom({
		'index.ts': `
      import { Component, input, booleanAttribute } from '@angular/core';
      @Component({ selector: 'lu-x', template: '' })
      export class XComponent {
        readonly block = input<boolean, boolean | \`\${boolean}\` | ''>(false, { transform: booleanAttribute });
        readonly plain = input<string>('');
      }
    `,
	});
	const byName = Object.fromEntries(doc.components[0].inputsClass.map((i) => [i.name, i]));

	test('documents the write type an author binds, not the read type', () => {
		expect(byName.block.type).toBe("boolean | `${boolean}` | ''");
	});

	test('a single-argument input is unchanged', () => {
		expect(byName.plain.type).toBe('string');
	});
});

describe('interface inheritance', () => {
	const { doc } = docFrom({
		'index.ts': `
      export interface Base {
        /** From the base. */
        id: string;
        label?: string;
        describe(): string;
      }
      export interface Derived extends Base {
        /** Narrowed here. */
        label: string;
        scope: number;
      }
    `,
	});
	const derived = doc.interfaces.find((i) => i.name === 'Derived');
	const byName = Object.fromEntries(derived.properties.map((p) => [p.name, p]));

	test('inherited properties reach the feed', () => {
		expect(Object.keys(byName).sort()).toEqual(['id', 'label', 'scope']);
		expect(byName.id.rawdescription).toBe('From the base.');
	});

	test('the derived declaration wins over the inherited one', () => {
		expect(byName.label.optional).toBe(false);
		expect(byName.label.rawdescription).toBe('Narrowed here.');
	});

	test('inherited methods reach the feed', () => {
		expect(derived.methodsClass.map((m) => m.name)).toEqual(['describe']);
	});
});

describe('the callable and readable surface of a plain class', () => {
	const { doc } = docFrom({
		'index.ts': `
      import { Directive, input } from '@angular/core';
      // Stubs: the in-memory project has no node_modules, and the emitter payload is
      // read off the resolved type — an unresolvable import would make it \`any\`.
      declare class Subject<T> { next(value: T): void; }
      declare class EventEmitter<T> extends Subject<T> {}
      declare class OutputEmitterRef<T> { emit(value: T): void; }
      declare function outputFromObservable<T>(source: Subject<T>, opts?: { alias?: string }): OutputEmitterRef<T>;
      /** A formatter. */
      export class Formatter {
        /** Format it. */
        static format(value: string, upper = false): string { return value; }
        static #hidden(): void {}
        /** The stream. */
        readonly changes$ = new Subject<string>();
        get label(): string { return ''; }
        private secret = 1;
        protected internal = 2;
        /** Open it. */
        open<T, D>(component: T, data?: D): D | undefined { return data; }
      }
      @Directive({ selector: '[luItem]' })
      export class ItemDirective {
        readonly size = input<'s' | 'm'>('s');
        readonly onSelect = new EventEmitter<boolean>();
        protected readonly onSelectOutput = outputFromObservable(this.onSelect, { alias: 'onSelect' });
      }
    `,
	});
	const formatter = doc.classes.find((c) => c.name === 'Formatter');
	const directive = doc.directives.find((d) => d.name === 'ItemDirective');

	test('a public static method stays in the surface, flagged as static', () => {
		const format = formatter.methodsClass.find((m) => m.name === 'format');
		expect(format).toBeDefined();
		expect(format.static).toBe(true);
		expect(format.rawdescription).toBe('Format it.');
		expect(formatter.methodsClass.map((m) => m.name)).not.toContain('#hidden');
	});

	test('a method publishes its own type parameters', () => {
		expect(formatter.methodsClass.find((m) => m.name === 'open').typeParameters).toEqual(['T', 'D']);
	});

	test('public properties and getters reach the feed, private and protected ones do not', () => {
		expect(formatter.properties.map((p) => p.name).sort()).toEqual(['changes$', 'label']);
		expect(formatter.properties.find((p) => p.name === 'changes$').rawdescription).toBe('The stream.');
	});

	test('a property already published as an input or an output is not repeated', () => {
		expect(directive.properties.map((p) => p.name)).not.toContain('size');
	});

	test('an inferred outputFromObservable payload falls back to the resolved type', () => {
		expect(directive.outputsClass.find((o) => o.name === 'onSelect').type).toBe('boolean');
	});
});

describe('members that only look public', () => {
	const { doc } = docFrom({
		'index.ts': `
      import { Directive, input, model } from '@angular/core';
      @Directive({ selector: '[luAliased]' })
      export class AliasedDirective {
        readonly clearableInput = input<boolean>(false, { alias: 'clearable' });
        readonly valueModel = model<string>('', { alias: 'value' });
        _internal = 1;
        static ngTemplateContextGuard(dir: AliasedDirective, ctx: unknown): ctx is object { return true; }
      }
    `,
	});
	const directive = doc.directives[0];

	test('an aliased signal input is published once, under its alias', () => {
		expect(directive.inputsClass.map((i) => i.name).sort()).toEqual(['clearable', 'value']);
		expect(directive.properties.map((p) => p.name)).not.toContain('clearableInput');
		expect(directive.properties.map((p) => p.name)).not.toContain('valueModel');
	});

	test('an underscore-prefixed member stays out of the surface', () => {
		expect(directive.properties.map((p) => p.name)).not.toContain('_internal');
	});
});
