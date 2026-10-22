import { ComponentRef, createEnvironmentInjector, EnvironmentInjector, InjectOptions, ProviderToken, reflectComponentType, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { FILTER_PILL_INPUT_COMPONENT, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { ElementControl } from './element-control';
import { closestComponent, ELEMENT_COMPONENT, ELEMENT_PAGE_CONTENT, ElementComponent, ElementComponentHost, LOGICAL_PARENT } from './element-component';

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

type ElementProperties = Record<string, unknown>;

const CONNECT_DETACHED = Symbol('connectDetached');

/**
 * Connects the elements registered by this bundle in a detached `node`, outside of other registered elements, which
 * connect their own content.
 */
function connectDetachedElements(node: Node, parent: HTMLElement): void {
	if (CONNECT_DETACHED in node) {
		(node as unknown as { [CONNECT_DETACHED](parent: HTMLElement): void })[CONNECT_DETACHED](parent);
	} else {
		node.childNodes.forEach((child) => connectDetachedElements(child, parent));
	}
}

let pendingFirstConnects: { element: HTMLElement; connect: () => void }[] = [];

/**
 * Runs the first connection of elements in document order, so that a parent element's component exists before its
 * descendants inject from it: elements are upgraded in the order they are defined, not in document order.
 * While the document is parsed, waits for the page scripts to set properties first (`entry`, `options`…): a required
 * input read before throws.
 */
function scheduleFirstConnect(element: HTMLElement, connect: () => void): void {
	if (pendingFirstConnects.length === 0) {
		const flush = () => {
			const pending = pendingFirstConnects;
			pendingFirstConnects = [];
			pending.sort((a, b) => (a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)).forEach((item) => item.connect());
		};
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', flush, { once: true });
		} else {
			queueMicrotask(flush);
		}
	}
	pendingFirstConnects.push({ element, connect });
}

/**
 * Registers `component` as the custom element `tagName`, on top of Angular Elements:
 * - aliased inputs are exposed as properties named after the alias (Angular Elements uses the class field name),
 * - form components get a `value` property, a `valueChange` event and a `required` attribute, see `ElementControl`,
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

	class PrismeElement extends NgElementClass implements ElementComponentHost {
		readonly #control = new ElementControl(this, exposesValue);

		constructor() {
			super();
			// Each element is its own Angular root: chain its injector to the parent element's component, resolved on each
			// lookup since the parent is only known once connected
			const parent = {
				get: <T>(token: ProviderToken<T>, notFoundValue?: T, options?: InjectOptions): T =>
					(closestComponent(this)?.injector ?? injector).get(token, notFoundValue, options as InjectOptions & { optional?: false }),
			};
			// Must be set before anything creates the Angular Elements strategy, which reads it once
			(this as unknown as NgElementInternals).injector = createEnvironmentInjector(
				[
					{ provide: NgControl, useValue: this.#control },
					{ provide: ELEMENT_PAGE_CONTENT, useFactory: () => this.#pageContent ?? [] },
				],
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

		#pageClasses: string[] | null = null;

		#pageContent: Node[] | null = null;

		connectedCallback(): void {
			if (this.#renderedByAngular === null) {
				// Deferred: Angular marks the elements it renders right after inserting them
				scheduleFirstConnect(this, () => {
					if (this.#renderedByAngular === null) {
						this.#renderedByAngular = Object.hasOwn(this, NG_CONTEXT);
						if (this.isConnected) {
							this.connectedCallback();
						}
					}
				});
				return;
			}
			if (this.#renderedByAngular) {
				return;
			}
			this.#connect();
		}

		/**
		 * Connects an element the page wrote in `parent`, which projects it in a template rendered later (the popover of a
		 * filter pill): as in Angular, its component exists anyway, and outlives the template.
		 */
		[CONNECT_DETACHED](parent: HTMLElement): void {
			(this as HTMLElement & { [LOGICAL_PARENT]?: HTMLElement })[LOGICAL_PARENT] = parent;
			this.#renderedByAngular = false;
			this.#connect();
		}

		#connect(): void {
			const internals = this as unknown as NgElementInternals;
			// Angular replaces the `class` attribute with the component's host class: keep the page's (`pr-u-*` utilities…)
			this.#pageClasses ??= [...this.classList];
			this.#pageContent ??= [...this.childNodes];
			(NgElementClass.prototype as unknown as NgElementInternals).connectedCallback.call(this);
			this.classList.add(...this.#pageClasses);

			// Angular Elements subscribes to every output: only the listened ones are subscribed below
			internals.ngElementEventsSubscription?.unsubscribe();
			internals.ngElementEventsSubscription = null;
			this.#listenedOutputs.forEach((name) => this.#subscribeOutput(name));

			const componentInjector = internals.ngElementStrategy.componentRef?.injector;
			const accessors = componentInjector?.get(NG_VALUE_ACCESSOR, null);
			if (accessors?.length) {
				this.#control.connect(accessors[0], (this as unknown as ElementProperties)['value']);
				const formField = closestComponent(this, ({ instance }) => instance instanceof FormFieldComponent);
				this.#control.linkFormField(formField && { element: formField.element, instance: formField.instance as FormFieldComponent });
			}

			// A filter pill finds its input with a content query, which does not see another custom element
			const pillInput = componentInjector?.get(FILTER_PILL_INPUT_COMPONENT, null, { self: true });
			const pill = pillInput && closestComponent(this, ({ instance }) => instance instanceof FilterPillComponent);
			if (pill) {
				(pill.instance as FilterPillComponent).registerInput(pillInput);
			}

			this.#pageContent.filter((node) => !node.isConnected).forEach((node) => connectDetachedElements(node, this));
		}

		readonly #listenedOutputs = new Set<string>();
		// Outputs subscribed on the current component, which Angular Elements recreates when the element is moved
		#subscribedOutputs = new WeakMap<object, Set<string>>();

		#subscribeOutput(name: string): void {
			const instance = this[ELEMENT_COMPONENT]()?.instance as Record<string, Subscribable> | undefined;
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
			// An element rendered in a template of its logical parent outlives the template
			if (this.#renderedByAngular === false && !(LOGICAL_PARENT in this)) {
				(NgElementClass.prototype as unknown as NgElementInternals).disconnectedCallback.call(this);
			}
		}

		[ELEMENT_COMPONENT](): ElementComponent | null {
			const componentRef = this.#renderedByAngular === false ? (this as unknown as NgElementInternals).ngElementStrategy.componentRef : null;
			return componentRef && { injector: componentRef.injector, instance: componentRef.instance };
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
