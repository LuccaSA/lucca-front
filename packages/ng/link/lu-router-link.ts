import { LocationStrategy } from '@angular/common';
import { Attribute, Directive, ElementRef, Renderer2, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Directive({
	selector: '[luRouterLink]',
})
export class LuRouterLink extends RouterLink {
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
