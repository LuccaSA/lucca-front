import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';

import { LuccaIcon } from '@lucca-front/icons';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LU_CHIP_TRANSLATIONS } from './chip.translate';

@Component({
	selector: 'lu-chip, button[luChip], a[luChip]',
	templateUrl: './chip.component.html',
	styleUrl: './chip.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet, LuTooltipModule, IconComponent],
	host: {
		class: 'chip',
		'[class.is-disabled]': 'disabled()',
		'[class.palette-product]': 'palette() === "product"',
		'[class.mod-S]': 'size() === "S"',
		'[class.palette-warning]': 'isWarning()',
		'[class.palette-critical]': 'isCritical()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
	readonly intl = getIntl(LU_CHIP_TRANSLATIONS);

	/**
	 * Add an ellipsis if the text is too long
	 */
	readonly withEllipsis = input(false, { transform: booleanAttribute });

	/**
	 * Removed kill button
	 */
	readonly unkillable = input(false, { transform: booleanAttribute });

	/**
	 * Which palette should be used for the entire chip.
	 * Defaults to none (inherits parent palette)
	 */
	readonly palette = input<string>();

	/**
	 * Disabled the chip
	 */
	readonly disabled = input(false, { transform: booleanAttribute });

	/**
	 * Which size should the chip be? Defaults or small
	 */
	readonly size = input<'S' | null>(null);

	/**
	 * State is a shorthand to set the icon and the palette to the recommended values for the icon and palette based on
	 * the provided state.
	 *
	 * If one of the icon or palette inputs are filled along with the state input, their values will have the priority over
	 * state (so setting state to success and palette to warning will make the palette warning)
	 */
	readonly state = input<'warning' | 'critical' | null>(null);

	/**
	 * Which icon should we display in the chip if any?
	 * Defaults to no icon.
	 */
	readonly icon = input<LuccaIcon | null>(null);

	/**
	 * Emit event when button kill is click
	 */
	readonly kill = output<Event>();

	readonly stateAlt = computed(() => (this.isWarning() ? this.intl.warning : this.isCritical() ? this.intl.error : ''));
	readonly isWarning = computed<boolean>(() => this.state() === 'warning');
	readonly isCritical = computed<boolean>(() => this.state() === 'critical');
	readonly displayedIcon = computed<LuccaIcon | null>(() => (this.isWarning() ? 'signWarning' : this.isCritical() ? 'signError' : this.icon()));
}
