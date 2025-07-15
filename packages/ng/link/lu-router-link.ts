import { RouterLink } from '@angular/router';
import { Directive, WritableSignal } from '@angular/core';

@Directive({
	selector: '[luRouterLink]',
})
export class LuRouterLink extends RouterLink {
	// With angular 20, RouterLink changed to use an internal, protected, readonly signal that is directly bound to `attr.href`, breaking any possibility to override it
	// So we had to do this to expose it to our `luLink` component.
	get publicReactiveHref(): WritableSignal<string | null> {
		return this.reactiveHref;
	}
}
