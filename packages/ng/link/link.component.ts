<<<<<<< HEAD
import { afterNextRender, booleanAttribute, Component, effect, HostBinding, HostListener, inject, Injector, input, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
=======
import { booleanAttribute, ChangeDetectionStrategy, Component, effect, inject, input, Input, ViewEncapsulation } from '@angular/core';
>>>>>>> rc
import { getIntl } from '@lucca-front/ng/core';
import { LU_LINK_TRANSLATIONS } from './link.translate';
import { LuRouterLink } from './lu-router-link';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'a[luLink], button[luLink]',
	templateUrl: './link.component.html',
	styleUrl: './link.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'link',
		'[attr.href]': 'routerLink.publicReactiveHref()',
		'[class.mod-decorationHover]': 'decorationHover',
		'[class.mod-icon]': 'external',
		'[attr.rel]': 'external && !disabled() ? `noopener noreferrer` : null',
		'[attr.target]': 'external && !disabled() ? `_blank` : null',
		'[attr.role]': 'disabled() ? `presentation` : null',
		'[class.is-disabled]': 'disabled()',
	},
	hostDirectives: [
		{
			directive: LuRouterLink,
			inputs: ['preserveFragment', 'skipLocationChange', 'replaceUrl', 'queryParams', 'fragment', 'queryParamsHandling', 'state', 'info', 'relativeTo'],
		},
	],
})
export class LinkComponent {
	intl = getIntl(LU_LINK_TRANSLATIONS);
	routerLink = inject(LuRouterLink);
	#injector = inject(Injector);
	router = inject(Router);

	readonly luHref = input('', { alias: 'href' });

	readonly routerLinkCommands = input<LuRouterLink['routerLink'] | null>(null, { alias: 'luLink' });

	readonly disabled = input(false, { transform: booleanAttribute });

	@Input({
		transform: booleanAttribute,
	})
	decorationHover = false;

	@Input({
		transform: booleanAttribute,
	})
	external = false;

	@HostBinding('attr.rel')
	get relAttr() {
		return this.external && !this.disabled() ? 'noopener noreferrer' : null;
	}

	@HostBinding('attr.target')
	get targetAttr() {
		return this.external && !this.disabled() ? '_blank' : null;
	}

	@HostBinding('attr.role')
	get roleAttr() {
		return this.disabled() ? 'presentation' : null;
	}

	@HostBinding('class.is-disabled')
	get disabledClass() {
		return this.disabled();
	}

	@HostListener('click')
	redirect(): void {
		if (!this.disabled() && this.routerLinkCommands() && this.external) {
			afterNextRender(() => window.open(this.router.serializeUrl(this.router.createUrlTree([this.routerLinkCommands()])), '_blank'), { injector: this.#injector });
		}
	}

	#hrefBackup: string;

	constructor() {
		const href = this.luHref;

		effect(() => {
			if (href()) {
				this.#hrefBackup = href();
				this.routerLink.publicReactiveHref.set(this.#hrefBackup);
			}
			if (this.disabled()) {
				if (this.routerLinkCommands()) {
					this.routerLink.routerLink = null;
				}
				this.routerLink.publicReactiveHref.set(null);
			} else if (this.routerLinkCommands() && !this.external) {
				this.routerLink.routerLink = this.routerLinkCommands();
				// We need to do this in order to have `routerLink` update the value for `href`:
				// See https://github.com/angular/angular/blob/main/packages/router/src/directives/router_link.ts#L281
				this.routerLink.ngOnChanges({});
			} else if (!href() && this.#hrefBackup) {
				this.routerLink.publicReactiveHref.set(this.#hrefBackup);
			}
		});
	}
}
