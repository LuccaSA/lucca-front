import { ComponentRef, createEnvironmentInjector, EnvironmentInjector, reflectComponentType, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ElementControl } from './element-control';

// Fields of Angular Elements' `NgElementImpl` and `ComponentNgElementStrategy` used below
interface NgElementInternals {
	injector: EnvironmentInjector | undefined;
	ngElementStrategy: { componentRef: ComponentRef<unknown> | null };
	connectedCallback(): void;
}

type ElementProperties = Record<string, unknown>;

/**
 * Registers `component` as the custom element `tagName`, on top of Angular Elements:
 * - aliased inputs are exposed as properties named after the alias (Angular Elements uses the class field name),
 * - form components get a `value` property and a `valueChange` event, see `ElementControl`.
 */
export function defineElement(tagName: string, component: Type<unknown>, injector: EnvironmentInjector): void {
	const inputs = reflectComponentType(component)?.inputs ?? [];
	const aliasedInputs = inputs.filter(({ propName, templateName }) => propName !== templateName);
	const exposesValue = !inputs.some(({ templateName }) => templateName === 'value');
	const NgElementClass = createCustomElement(component, { injector }) as unknown as typeof HTMLElement;

	class PrismeElement extends NgElementClass {
		readonly #control = new ElementControl(this);

		constructor() {
			super();
			// Must be set before anything creates the Angular Elements strategy, which reads it once
			(this as unknown as NgElementInternals).injector = createEnvironmentInjector([{ provide: NgControl, useValue: this.#control }], injector);

			// Elements are defined once the application is created: a value set by the page before that is an own property
			// hiding the accessor. Angular Elements already does the same for class field names.
			const element = this as unknown as ElementProperties;
			for (const { propName, templateName } of aliasedInputs) {
				if (Object.hasOwn(element, templateName)) {
					const value = element[templateName];
					delete element[templateName];
					element[propName] = value;
				}
			}
			if (exposesValue && Object.hasOwn(element, 'value')) {
				const value = element['value'];
				delete element['value'];
				this.#control.setValue(value);
			}
		}

		connectedCallback(): void {
			const internals = this as unknown as NgElementInternals;
			(NgElementClass.prototype as unknown as NgElementInternals).connectedCallback.call(this);
			const accessors = internals.ngElementStrategy.componentRef?.injector.get(NG_VALUE_ACCESSOR, null);
			if (accessors?.length) {
				this.#control.connect(accessors[0]);
			}
		}

		get value(): unknown {
			return this.#control.control.value;
		}

		set value(value: unknown) {
			this.#control.setValue(value);
		}
	}

	for (const { propName, templateName } of aliasedInputs) {
		Object.defineProperty(PrismeElement.prototype, templateName, {
			get(this: ElementProperties) {
				return this[propName];
			},
			set(this: ElementProperties, value: unknown) {
				this[propName] = value;
			},
			configurable: true,
			enumerable: true,
		});
	}

	if (!exposesValue) {
		// The component has its own `value` input: keep the accessor Angular Elements defined for it
		delete (PrismeElement.prototype as unknown as ElementProperties)['value'];
	}

	customElements.define(tagName, PrismeElement);
}
