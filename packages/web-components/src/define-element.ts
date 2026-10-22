import { ComponentRef, createEnvironmentInjector, EnvironmentInjector, InjectOptions, Injector, ProviderToken, reflectComponentType, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ElementControl } from './element-control';

// Fields of Angular Elements' `NgElementImpl` and `ComponentNgElementStrategy` used below
interface NgElementInternals {
	injector: EnvironmentInjector | undefined;
	ngElementStrategy: { componentRef: ComponentRef<unknown> | null };
	ngElementEventsSubscription: { unsubscribe(): void } | null;
	connectedCallback(): void;
	disconnectedCallback(): void;
}

interface Subscribable {
	subscribe(callback: (value: unknown) => void): unknown;
}

// Set by Angular on the elements it renders
const NG_CONTEXT = '__ngContext__';

const COMPONENT_REF = Symbol('componentRef');

type ElementProperties = Record<string, unknown>;

/**
 * The injector of the component rendered by the closest ancestor element registered by this bundle, if any.
 */
function closestComponentInjector(element: HTMLElement): Injector | null {
	for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
		const componentRef = (ancestor as unknown as { [COMPONENT_REF]?: () => ComponentRef<unknown> | null })[COMPONENT_REF]?.();
		if (componentRef) {
			return componentRef.injector;
		}
	}
	return null;
}

/**
 * Registers `component` as the custom element `tagName`, on top of Angular Elements:
 * - aliased inputs are exposed as properties named after the alias (Angular Elements uses the class field name),
 * - form components get a `value` property and a `valueChange` event, see `ElementControl`,
 * - nested elements inject what their parent element's component provides (`lu-grid-column` in `lu-grid`), as in a template,
 * - an output is only subscribed once the page listens to its event, as in a template: some components check whether
 *   an output is bound (`clueChange` makes a select searchable).
 */
export function defineElement(tagName: string, component: Type<unknown>, injector: EnvironmentInjector): void {
	const outputs = new Map((reflectComponentType(component)?.outputs ?? []).map(({ propName, templateName }) => [templateName, propName]));
	const inputs = reflectComponentType(component)?.inputs ?? [];
	const aliasedInputs = inputs.filter(({ propName, templateName }) => propName !== templateName);
	const exposesValue = !inputs.some(({ templateName }) => templateName === 'value');
	const NgElementClass = createCustomElement(component, { injector }) as unknown as typeof HTMLElement;

	class PrismeElement extends NgElementClass {
		readonly #control = new ElementControl(this, exposesValue);

		constructor() {
			super();
			// Each element is its own Angular root: chain its injector to the parent element's component, resolved on each
			// lookup since the parent is only known once connected
			const parent = {
				get: <T>(token: ProviderToken<T>, notFoundValue?: T, options?: InjectOptions): T =>
					(closestComponentInjector(this) ?? injector).get(token, notFoundValue, options as InjectOptions & { optional?: false }),
			};
			// Must be set before anything creates the Angular Elements strategy, which reads it once
			(this as unknown as NgElementInternals).injector = createEnvironmentInjector(
				[{ provide: NgControl, useValue: this.#control }],
				// Only used for lookups, which is all an environment injector needs from its parent
				parent as unknown as EnvironmentInjector,
			);

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

		/**
		 * Whether Angular rendered this element in the template of another component (`lu-time-picker` in
		 * `lu-time-range-picker`): Angular already created its component, the custom element must not create a second one.
		 */
		#renderedByAngular: boolean | null = null;

		connectedCallback(): void {
			if (this.#renderedByAngular === null) {
				const firstConnect = () => {
					if (this.#renderedByAngular === null) {
						this.#renderedByAngular = Object.hasOwn(this, NG_CONTEXT);
						if (this.isConnected) {
							this.connectedCallback();
						}
					}
				};
				if (document.readyState === 'loading') {
					// Let the page scripts set properties first (`entry`, `options`…): a required input read before throws
					document.addEventListener('DOMContentLoaded', firstConnect, { once: true });
				} else {
					// Angular marks the elements it renders right after inserting them: decide once it is done
					queueMicrotask(firstConnect);
				}
				return;
			}
			if (this.#renderedByAngular) {
				return;
			}

			const internals = this as unknown as NgElementInternals;
			(NgElementClass.prototype as unknown as NgElementInternals).connectedCallback.call(this);

			// Angular Elements subscribes to every output: only the listened ones are subscribed below
			internals.ngElementEventsSubscription?.unsubscribe();
			internals.ngElementEventsSubscription = null;
			this.#listenedOutputs.forEach((name) => this.#subscribeOutput(name));

			const accessors = internals.ngElementStrategy.componentRef?.injector.get(NG_VALUE_ACCESSOR, null);
			if (accessors?.length) {
				this.#control.connect(accessors[0], (this as unknown as ElementProperties)['value']);
			}
		}

		readonly #listenedOutputs = new Set<string>();
		// Outputs subscribed on the current component, which Angular Elements recreates when the element is moved
		#subscribedOutputs = new WeakMap<object, Set<string>>();

		#subscribeOutput(name: string): void {
			const instance = this[COMPONENT_REF]()?.instance as Record<string, Subscribable> | undefined;
			if (!instance) {
				return;
			}
			const subscribed = this.#subscribedOutputs.get(instance) ?? new Set<string>();
			this.#subscribedOutputs.set(instance, subscribed);
			if (!subscribed.has(name)) {
				subscribed.add(name);
				// Completed with the component
				instance[outputs.get(name)!].subscribe((detail) => this.dispatchEvent(new CustomEvent(name, { detail })));
			}
		}

		override addEventListener(...args: Parameters<HTMLElement['addEventListener']>): void {
			super.addEventListener(...args);
			const [name] = args;
			if (outputs.has(name)) {
				this.#listenedOutputs.add(name);
				this.#subscribeOutput(name);
			}
		}

		disconnectedCallback(): void {
			if (this.#renderedByAngular === false) {
				(NgElementClass.prototype as unknown as NgElementInternals).disconnectedCallback.call(this);
			}
		}

		[COMPONENT_REF](): ComponentRef<unknown> | null {
			return this.#renderedByAngular === false ? (this as unknown as NgElementInternals).ngElementStrategy.componentRef : null;
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
