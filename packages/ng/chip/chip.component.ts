import { booleanAttribute, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { LU_CHIP_TRANSLATIONS } from './chip.translate';

@Component({
	selector: 'lu-chip',
	standalone: true,
	templateUrl: './chip.component.html',
	styleUrls: ['./chip.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'chip',
	},
})
export class ChipComponent {
	intl = getIntl(LU_CHIP_TRANSLATIONS);

	@Input({ transform: booleanAttribute })
	unkillable = false;

	@Input()
	palette?: string;

	@Input({ transform: booleanAttribute })
	@HostBinding('class.is-disabled')
	disabled = false;

	@HostBinding('class.palette-product')
	get classPalette() {
		return this.palette === 'product';
	}
}
