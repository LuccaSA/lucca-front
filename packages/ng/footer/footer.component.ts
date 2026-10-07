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
	/**
	 * Sticks the footer to the bottom of the viewport on vertical scroll
	 */
	readonly sticky = input(false, { transform: luBooleanAttribute });

	/**
	 * Applies a container around the footer content
	 */
	readonly container = input(false, { transform: luBooleanAttribute });

	/**
	 * Sets the maximum width of the container
	 */
	readonly containerMax = input<FooterContainerMax | null>();

	/**
	 * Forces the narrow (responsive) layout
	 */
	readonly forceNarrow = input(false, { transform: luBooleanAttribute });

	/**
	 * Adapts the footer to be used inside a dialog
	 */
	readonly dialog = input(false, { transform: luBooleanAttribute });

	/**
	 * Sets the breakpoint below which the narrow (responsive) layout is applied
	 */
	readonly narrowAtMediaMax = input<FooterNarrowAtMediaMax>('XXS');

	readonly breakpointClass = computed(() => (this.forceNarrow() ? 'mod-narrow' : { [`mod-narrowAtMediaMax${this.narrowAtMediaMax()}`]: !!this.narrowAtMediaMax() }));
}
