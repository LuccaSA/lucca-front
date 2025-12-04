import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';

import { LuccaIcon } from '@lucca-front/icons';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LU_CHIP_TRANSLATIONS } from './chip.translate';

@Component({
	selector: 'lu-chip',
	templateUrl: './chip.component.html',
	styleUrl: './chip.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet, LuTooltipModule, IconComponent],
	host: {
		class: 'chip',
		'[class.is-disabled]': 'disabled()',
		'[class.palette-product]': 'classPalette()',
		'[class.mod-S]': 'size() === "S"',
		'[class.is-warning]': 'isWarning()',
		'[class.is-critical]': 'isCritical()',
	},
})
export class ChipComponent {
	intl = getIntl(LU_CHIP_TRANSLATIONS);

	withEllipsis = input(false, { transform: booleanAttribute });

	readonly unkillable = input(false, { transform: booleanAttribute });

	readonly palette = input<string>();

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly size = input<'S' | null>(null);

	readonly state = input<'warning' | 'critical' | null>(null);

	readonly icon = input<LuccaIcon | null>(null);

	readonly kill = output<Event>();

	readonly classPalette = computed<boolean>(() => this.palette() === 'product');
	readonly isWarning = computed<boolean>(() => this.state() === 'warning');
	readonly isCritical = computed<boolean>(() => this.state() === 'critical');
	readonly displayedIcon = computed<LuccaIcon | null>(() => (this.isWarning() ? 'signWarning' : this.isCritical() ? 'signError' : this.icon()));
}
