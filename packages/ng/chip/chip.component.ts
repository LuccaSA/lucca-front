import { booleanAttribute, Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { LU_CHIP_TRANSLATIONS } from './chip.translate';

@Component({
	selector: 'lu-chip',
	standalone: true,
	templateUrl: './chip.component.html',
	styleUrl: './chip.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'chip',
		'[class.is-disabled]': 'disabled()',
		'[class.palette-product]': 'classPalette()',
	},
})
export class ChipComponent {
	intl = getIntl(LU_CHIP_TRANSLATIONS);

	withEllipsis = input(false, { transform: booleanAttribute });

	readonly unkillable = input(false, { transform: booleanAttribute });

	readonly palette = input<string>();

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly classPalette = computed(() => this.palette() === 'product');

	readonly kill = output<Event>();
}
