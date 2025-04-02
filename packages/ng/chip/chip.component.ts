import { booleanAttribute, Component, HostBinding, input, Input, ViewEncapsulation } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
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
	intl = input(...intlInputOptions(LU_CHIP_TRANSLATIONS));

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
