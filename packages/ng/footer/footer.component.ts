import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-footer',
	styleUrl: './footer.component.scss',
	templateUrl: './footer.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	readonly sticky = input(false, { transform: luBooleanAttribute });

	/**
	 * Applies a container around the Page Header content
	 */
	readonly container = input(false, { transform: luBooleanAttribute });

	readonly containerMax = input<null | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'>();

	readonly forceNarrow = input(false, { transform: luBooleanAttribute });

	readonly dialog = input(false, { transform: luBooleanAttribute });

	readonly narrowAtMediaMax = input<'XXS' | 'XS' | 'S' | 'M'>('XXS');

	readonly breakpointClass = computed(() => (this.forceNarrow() ? 'mod-narrow' : { [`mod-narrowAtMediaMax${this.narrowAtMediaMax()}`]: !!this.narrowAtMediaMax() }));
}
