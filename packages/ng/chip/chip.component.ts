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
		'[class.palette-product]': 'classPalette()',
		'[class.mod-S]': 'size() === "S"',
		'[class.palette-warning]': 'isWarning()',
		'[class.palette-critical]': 'isCritical()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
	intl = getIntl(LU_CHIP_TRANSLATIONS);

	withEllipsis = input(false, { transform: booleanAttribute });

	readonly unkillable = input(false, { transform: booleanAttribute });

	readonly palette = input<string>();

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly size = input<'S' | null>(null);

	readonly state = input<'warning' | 'critical' | null>(null);

	readonly stateAlt = computed(() => (this.isWarning() ? 'Warning' : this.isCritical() ? 'Error' : ''));

	readonly icon = input<LuccaIcon | null>(null);

	readonly kill = output<Event>();

	readonly classPalette = computed<boolean>(() => this.palette() === 'product');
	readonly isWarning = computed<boolean>(() => this.state() === 'warning');
	readonly isCritical = computed<boolean>(() => this.state() === 'critical');
	readonly displayedIcon = computed<LuccaIcon | null>(() => (this.isWarning() ? 'signWarning' : this.isCritical() ? 'signError' : this.icon()));
}
