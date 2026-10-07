import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, output, ViewEncapsulation } from '@angular/core';
import { intlInputOptions, luBooleanAttribute } from '@lucca-front/ng/core';

import { LuccaIcon } from '@lucca-front/icons';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LU_CHIP_TRANSLATIONS } from './chip.translate';
import { ChipSize, ChipState } from './chip.type';

@Component({
	selector: 'lu-chip, button[luChip], a[luChip]',
	templateUrl: './chip.component.html',
	styleUrl: './chip.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet, LuTooltipTriggerDirective, IconComponent],
	host: {
		class: 'chip',
		'[class.is-disabled]': 'disabled()',
		'[class.mod-product]': 'palette() === "product"',
		'[class.mod-S]': 'size() === "S"',
		'[class.palette-warning]': 'isWarning()',
		'[class.palette-critical]': 'isCritical()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
	readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	readonly intl = input(...intlInputOptions(LU_CHIP_TRANSLATIONS));

	/**
	 * Add an ellipsis if the text is too long
	 */
	readonly withEllipsis = input(false, { transform: luBooleanAttribute });

	/**
	 * Makes the chip non-removable
	 */
	readonly unkillable = input(false, { transform: luBooleanAttribute });

	/**
	 * Applies the product palette to the chip when set to `product`, any other value has no effect.
	 * Defaults to none (inherits parent palette)
	 */
	readonly palette = input<string>();

	/**
	 * Disabled the chip
	 */
	readonly disabled = input(false, { transform: luBooleanAttribute });

	/**
	 * Which size should the chip be? Defaults to M (no value)
	 */
	readonly size = input<ChipSize | null>(null);

	/**
	 * State is a shorthand to set the icon and the palette to the recommended values for the icon and palette based on
	 * the provided state.
	 *
	 * If one of the icon or palette inputs are filled along with the state input, their values will have the priority over
	 * state (so setting state to success and palette to warning will make the palette warning)
	 */
	readonly state = input<ChipState | null>(null);

	/**
	 * Which icon should we display in the chip if any?
	 * Defaults to no icon.
	 */

	readonly icon = input<LuccaIcon | null>(null);

	/**
	 * Emit event when button kill is click
	 */
	readonly kill = output<Event>();
	readonly stateAlt = computed(() => (this.isWarning() ? this.intl().warning : this.isCritical() ? this.intl().error : ''));
	readonly isWarning = computed<boolean>(() => this.state() === 'warning');
	readonly isCritical = computed<boolean>(() => this.state() === 'critical');
	readonly displayedIcon = computed<LuccaIcon | null>(() => (this.isWarning() ? 'signWarning' : this.isCritical() ? 'signError' : this.icon()));

	protected readonly tooltipTriggerAnchor = computed(() => {
		const el = this.#elementRef.nativeElement;
		const isFocusable = el.tagName === 'BUTTON' ? !this.disabled() : el.tagName === 'A' ? el.hasAttribute('href') : false;
		return isFocusable ? el : undefined;
	});
}
