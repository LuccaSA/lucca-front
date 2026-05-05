import { ChangeDetectionStrategy, Component, ElementRef, inject, input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { SoftwareIconWrapperComponent } from '../software-icon-wrapper.component';
import { intlInputOptions, IntlParamsPipe } from '../../core/translate';
import { LU_SOFTWARE_ICON_WRAPPER_TRANSLATIONS } from '../software-icon-wrapper.translate';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[luSoftwareIconWrapperButton], a[luSoftwareIconWrapperButton], span[luSoftwareIconWrapperButton]',
	template: `
		<span class="softwareIconWrapper-item-action-more">
			<span aria-hidden="true" [attr.data-content-before]="'+' + parent.hiddenCount()"></span>
			<span class="pr-u-mask">{{ intl().seeMore | intlParams: { count: parent.hiddenCount() } }}</span>
		</span>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	exportAs: 'luSoftwareIconWrapperButton',
	host: {
		class: 'softwareIconWrapper-item-action',
	},
	imports: [IntlParamsPipe],
})
export class SoftwareIconWrapperButtonMoreComponent implements OnInit {
	readonly intl = input(...intlInputOptions(LU_SOFTWARE_ICON_WRAPPER_TRANSLATIONS));
	readonly parent = inject(SoftwareIconWrapperComponent, { optional: true });

	readonly hiddenIcons = this.parent?.hiddenIcons;

	readonly #el = inject(ElementRef<HTMLElement>);
	readonly #renderer = inject(Renderer2);

	ngOnInit(): void {
		const hostEl = this.#el.nativeElement as HTMLElement;
		const parentNode = hostEl.parentNode;

		const li = this.#renderer.createElement('li') as HTMLElement;
		this.#renderer.addClass(li, 'softwareIconWrapper-item');
		this.#renderer.setAttribute(li, 'role', 'presentation');

		this.#renderer.insertBefore(parentNode, li, hostEl);
		this.#renderer.appendChild(li, hostEl);
	}
}
