import { booleanAttribute, ChangeDetectionStrategy, Component, effect, ElementRef, HostBinding, inject, input, Input, OnDestroy, Renderer2, signal, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { LU_LINK_TRANSLATIONS } from './link.translate';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'a[luLink]',
	standalone: true,
	templateUrl: './link.component.html',
	styleUrls: ['./link.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: { class: 'link' },
})
export class LinkComponent implements OnDestroy {
	intl = getIntl(LU_LINK_TRANSLATIONS);

	#elementRef = inject<ElementRef<HTMLLinkElement>>(ElementRef);
	#renderer = inject(Renderer2);
	#observer: MutationObserver;

	// TODO : RouterLink - intercepter le click pour le disabled

	@Input({ required: true })
	label: string;

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
			if (this.#elementRef.nativeElement.href) {
				href.set(this.#elementRef.nativeElement.href);
			}
		});

		this.#observer.observe(this.#elementRef.nativeElement, { attributes: true, attributeFilter: ['href'] });

		effect(() => {
			if (this.disabled()) {
				this.hrefBackup = href();
				this.#renderer.removeAttribute(this.#elementRef.nativeElement, 'href');
			} else if (!href()) {
				this.#renderer.setAttribute(this.#elementRef.nativeElement, 'href', this.hrefBackup);
			}
		});
	}

	ngOnDestroy(): void {
		this.#observer.disconnect();
	}
}
