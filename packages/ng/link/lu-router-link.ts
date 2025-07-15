import { RouterLink } from '@angular/router';
import { Directive, WritableSignal } from '@angular/core';

@Directive({
	selector: '[luRouterLink]',
})
export class LuRouterLink extends RouterLink {
	get publicReactiveHref(): WritableSignal<string | null> {
		return this.reactiveHref;
	}
}
