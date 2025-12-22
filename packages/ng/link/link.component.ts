import { afterNextRender, booleanAttribute, ChangeDetectionStrategy, Component, effect, inject, Injector, input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { getIntl } from '@lucca-front/ng/core';
import { LU_LINK_TRANSLATIONS } from './link.translate';
import { LuRouterLink } from './lu-router-link';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'a[luLink], button[luLink]',
	standalone: true,
	templateUrl: './link.component.html',
	styleUrl: './link.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'link',
		'[attr.href]': 'routerLink.publicReactiveHref()',
		'[class.mod-decorationHover]': 'decorationHover()',
		'[class.mod-icon]': 'external()',
		'[class.is-disabled]': 'this.disabled()',
		'[attr.rel]': 'external() && !disabled() ? "noopener noreferrer" : null',
		'[attr.target]': 'external() && !disabled() ? "_blank" : null',
		'[attr.role]': 'disabled() ? "presentation" : null',
		'(click)': 'redirect()',
	},
	hostDirectives: [
		{
			directive: LuRouterLink,
			inputs: ['preserveFragment', 'skipLocationChange', 'replaceUrl', 'queryParams', 'fragment', 'queryParamsHandling', 'state', 'info', 'relativeTo'],
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
	intl = getIntl(LU_LINK_TRANSLATIONS);
	routerLink = inject(LuRouterLink);
	#injector = inject(Injector);
	router = inject(Router);

	readonly luHref = input('', { alias: 'href' });

	readonly routerLinkCommands = input<LuRouterLink['routerLink'] | null>(null, { alias: 'luLink' });

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly decorationHover = input(false, { transform: booleanAttribute });

	readonly external = input(false, { transform: booleanAttribute });

	hrefBackup: string;

	constructor() {
		const href = this.luHref;

		effect(() => {
			if (href()) {
				this.hrefBackup = href();
				this.routerLink.publicReactiveHref.set(this.hrefBackup);
			}
			if (this.disabled()) {
				if (this.routerLinkCommands()) {
					this.routerLink.routerLink = null;
				}
				this.routerLink.publicReactiveHref.set(null);
			} else if (this.routerLinkCommands() && !this.external()) {
				this.routerLink.routerLink = this.routerLinkCommands();
				// We need to do this in order to have `routerLink` update the value for `href`:
				// See https://github.com/angular/angular/blob/main/packages/router/src/directives/router_link.ts#L281
				this.routerLink.ngOnChanges({});
			} else if (!href() && this.hrefBackup) {
				this.routerLink.publicReactiveHref.set(this.hrefBackup);
			}
		});
	}

	redirect(): void {
		const routerLinkCommands = this.routerLinkCommands();
		if (!this.disabled() && routerLinkCommands && this.external()) {
			afterNextRender(() => window.open(this.router.serializeUrl(this.router.createUrlTree(Array.isArray(routerLinkCommands) ? routerLinkCommands : [routerLinkCommands])), '_blank'), {
				injector: this.#injector,
			});
		}
	}
}
