import { RouterLink } from '@angular/router';
import { Directive, input, WritableSignal } from '@angular/core';

@Directive({
	selector: '[luRouterLink]',
	host: {
		'[attr.href]': 'reactiveHref()',
	},
})
export class LuRouterLink extends RouterLink {
	luHref = input('', { alias: 'href' });

	get publicReactiveHref(): WritableSignal<string | null> {
		return this.reactiveHref;
	}
}
