import { booleanAttribute, Component, effect, ElementRef, HostBinding, inject, input, Input, OnDestroy, Renderer2, signal, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { LU_LINK_TRANSLATIONS } from './link.translate';
import { RouterLink } from '@angular/router';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'a[luLink]',
	standalone: true,
	templateUrl: './link.component.html',
	styleUrls: ['./link.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: { class: 'link' },
	hostDirectives: [RouterLink],
})
export class LinkComponent implements OnDestroy {
	intl = getIntl(LU_LINK_TRANSLATIONS);

	#elementRef = inject<ElementRef<HTMLLinkElement>>(ElementRef);
	#renderer = inject(Renderer2);
	#observer: MutationObserver;

	#routerLink = inject(RouterLink);

	/**
	 * RouterLink Input forwarding
	 */
	@Input({ transform: booleanAttribute })
	set preserveFragment(value: RouterLink['preserveFragment']) {
		this.#routerLink.preserveFragment = value;
	}

	@Input({ transform: booleanAttribute })
	set skipLocationChange(value: RouterLink['skipLocationChange']) {
		this.#routerLink.skipLocationChange = value;
	}

	@Input({ transform: booleanAttribute })
	set replaceUrl(value: RouterLink['replaceUrl']) {
		this.#routerLink.replaceUrl = value;
	}

	@Input()
	set queryParams(value: RouterLink['queryParams']) {
		this.#routerLink.queryParams = value;
	}

	@Input()
	set fragment(value: RouterLink['fragment']) {
		this.#routerLink.fragment = value;
	}

	@Input()
	set queryParamsHandling(value: RouterLink['queryParamsHandling']) {
		this.#routerLink.queryParamsHandling = value;
	}

	@Input()
	set state(value: RouterLink['state']) {
		this.#routerLink.state = value;
	}

	@Input()
	set info(value: RouterLink['info']) {
		this.#routerLink.info = value;
	}

	@Input()
	set relativeTo(value: RouterLink['relativeTo']) {
		this.#routerLink.relativeTo = value;
	}

	/**
	 * End RouterLink Input forwarding
	 */

	@Input({ required: true })
	label: string;

	routerLinkCommands = input<RouterLink['routerLink'] | null>(null, { alias: 'luLink' });

	disabled = input<boolean, boolean>(false, { transform: booleanAttribute });

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
		const href = signal<string>(this.#elementRef.nativeElement.href);

		this.#observer = new MutationObserver(() => {
			href.set(this.#elementRef.nativeElement.href);
		});

		this.#observer.observe(this.#elementRef.nativeElement, { attributes: true, attributeFilter: ['href'] });

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

	ngOnDestroy(): void {
		this.#observer.disconnect();
	}
}
