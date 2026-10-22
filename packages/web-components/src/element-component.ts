import { InjectionToken, Injector } from '@angular/core';

/**
 * The child nodes the page wrote in a custom element, before its component replaced them.
 */
export const ELEMENT_PAGE_CONTENT = new InjectionToken<readonly Node[]>('ElementPageContent');

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
 * Set on an element the page wrote in another one, which projects it in a template rendered later (the popover of a
 * filter pill): that other element stays its parent, wherever the template is rendered.
 */
export const LOGICAL_PARENT = Symbol('logicalParent');

function parentOf(element: HTMLElement): HTMLElement | null {
	return (element as HTMLElement & { [LOGICAL_PARENT]?: HTMLElement })[LOGICAL_PARENT] ?? element.parentElement;
}

/**
 * The component hosted by the closest ancestor of `element` matching `predicate`, if any.
 */
export function closestComponent(element: HTMLElement, predicate: (component: ElementComponent) => boolean = () => true): (ElementComponent & { element: HTMLElement }) | null {
	for (let ancestor = parentOf(element); ancestor; ancestor = parentOf(ancestor)) {
		const component = (ancestor as Partial<ElementComponentHost>)[ELEMENT_COMPONENT]?.();
		if (component && predicate(component)) {
			return { ...component, element: ancestor };
		}
	}
	return null;
}
