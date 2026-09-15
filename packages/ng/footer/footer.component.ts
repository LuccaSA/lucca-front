import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { FooterContainerMax, FooterNarrowAtMediaMax } from './footer.type';

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

	readonly containerMax = input<FooterContainerMax | null>();

	readonly forceNarrow = input(false, { transform: luBooleanAttribute });

	readonly dialog = input(false, { transform: luBooleanAttribute });

	readonly narrowAtMediaMax = input<FooterNarrowAtMediaMax>('XXS');

	readonly breakpointClass = computed(() => (this.forceNarrow() ? 'mod-narrow' : { [`mod-narrowAtMediaMax${this.narrowAtMediaMax()}`]: !!this.narrowAtMediaMax() }));
}
