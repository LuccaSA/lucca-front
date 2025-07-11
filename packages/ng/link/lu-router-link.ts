import { RouterLink } from '@angular/router';
import { Directive, WritableSignal } from '@angular/core';

@Directive({
	selector: '[luRouterLink]',
	host: {
		'[attr.href]': 'reactiveHref()',
	},
})
export class LuRouterLink extends RouterLink {
	get publicReactiveHref(): WritableSignal<string | null> {
		return this.reactiveHref;
	}
}
