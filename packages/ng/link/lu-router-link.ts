import { LocationStrategy } from '@angular/common';
import { Attribute, Directive, ElementRef, linkedSignal, Renderer2, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Directive({
	selector: '[luRouterLink]',
})
export class LuRouterLink extends RouterLink {
	/**
	 * Href forced by `luLink` (raw `href`, external or disabled link). `undefined` lets the router compute it.
	 */
	readonly hrefOverride = signal<string | null | undefined>(undefined);

	// Field initializers run after `super()`, so this still references the router-computed `linkedSignal` of `RouterLink`.
	readonly #routerHref: WritableSignal<string | null> = this.reactiveHref;

	// Since Angular 22, `reactiveHref` is a `linkedSignal` recomputed on every navigation, which wipes any value written with `set()`.
	// Deriving it from `hrefOverride` keeps the forced href across navigations.
	protected override readonly reactiveHref = linkedSignal<string | null>(() => {
		const hrefOverride = this.hrefOverride();
		return hrefOverride === undefined ? this.#routerHref() : hrefOverride;
	});

	// Workaround for a storybook bug = implement the constructor https://github.com/storybookjs/storybook/issues/23534#issuecomment-2042888436
	constructor(router: Router, route: ActivatedRoute, @Attribute('tabindex') tabIndexAttribute: string | null | undefined, renderer: Renderer2, el: ElementRef, locationStrategy?: LocationStrategy) {
		super(router, route, tabIndexAttribute, renderer, el, locationStrategy);
	}

	// With angular 20, RouterLink changed to use an internal, protected, readonly signal that is directly bound to `attr.href`, breaking any possibility to override it
	// So we had to do this to expose it to our `luLink` component.
	get publicReactiveHref(): WritableSignal<string | null> {
		return this.reactiveHref;
	}
}
