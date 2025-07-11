import { booleanAttribute, Component, effect, ElementRef, HostBinding, inject, input, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { LU_LINK_TRANSLATIONS } from './link.translate';
import { LuRouterLink } from './lu-router-link';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'a[luLink], button[luLink]',
	standalone: true,
	templateUrl: './link.component.html',
	styleUrls: ['./link.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: { class: 'link' },
	hostDirectives: [
		{
			directive: LuRouterLink,
			inputs: ['preserveFragment', 'skipLocationChange', 'replaceUrl', 'queryParams', 'fragment', 'queryParamsHandling', 'state', 'info', 'relativeTo'],
		},
	],
})
export class LinkComponent {
	intl = getIntl(LU_LINK_TRANSLATIONS);

	#elementRef = inject<ElementRef<HTMLLinkElement>>(ElementRef);
	#renderer = inject(Renderer2);
	#routerLink = inject(LuRouterLink);

	routerLinkCommands = input<LuRouterLink['routerLink'] | null>(null, { alias: 'luLink' });

	disabled = input(false, { transform: booleanAttribute });

	@Input({
		transform: booleanAttribute,
	})
	@HostBinding('class.mod-decorationHover')
	decorationHover = false;

	@Input({
		transform: booleanAttribute,
	})
	@HostBinding('class.mod-icon')
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

	hrefBackup: string;

	constructor() {
		const href = this.#routerLink.publicReactiveHref;

		effect(() => {
			if (href()) {
				this.hrefBackup = href();
			}
			if (this.disabled()) {
				if (this.routerLinkCommands()) {
					this.#routerLink.routerLink = null;
					this.#renderer.removeAttribute(this.#elementRef.nativeElement, 'href');
				} else {
					this.#renderer.removeAttribute(this.#elementRef.nativeElement, 'href');
				}
			} else if (this.routerLinkCommands()) {
				this.#routerLink.routerLink = this.routerLinkCommands();
				// We need to do this in order to have `routerLink` update the value for `href`:
				// See https://github.com/angular/angular/blob/main/packages/router/src/directives/router_link.ts#L281
				this.#routerLink.ngOnChanges({});
			} else if (!href() && this.hrefBackup) {
				this.#renderer.setAttribute(this.#elementRef.nativeElement, 'href', this.hrefBackup);
			}
		});
	}
}
