import { Injector } from '@angular/core';

/**
 * Implemented by the elements hosting an Angular component the bundle created: a registered custom element, or the
 * content of a dialog. Their descendants inject from that component, as they would in a template.
 */
export const ELEMENT_COMPONENT = Symbol('elementComponent');

export interface ElementComponent {
	injector: Injector;
	instance: unknown;
}

export interface ElementComponentHost {
	[ELEMENT_COMPONENT](): ElementComponent | null;
}

/**
 * The component hosted by the closest ancestor of `element` matching `predicate`, if any.
 */
export function closestComponent(element: HTMLElement, predicate: (component: ElementComponent) => boolean = () => true): (ElementComponent & { element: HTMLElement }) | null {
	for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
		const component = (ancestor as Partial<ElementComponentHost>)[ELEMENT_COMPONENT]?.();
		if (component && predicate(component)) {
			return { ...component, element: ancestor };
		}
	}
	return null;
}
