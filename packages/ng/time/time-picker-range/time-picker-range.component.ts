import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca/prisme/icon';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { LU_TIME_PICKER_RANGE_TRANSLATIONS } from './time-picker-range.translate';

@Component({
	selector: 'lu-time-picker-range',
	templateUrl: './time-picker-range.component.html',
	styleUrl: './time-picker-range.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, TimePickerComponent],
})
export class TimePickerRangeComponent {
	readonly intl = input(...intlInputOptions(LU_TIME_PICKER_RANGE_TRANSLATIONS));

	readonly forceMeridiemDisplay = input<boolean | null>(null);
	readonly label = input<string>();
	readonly displayArrows = input(false, { transform: booleanAttribute });
}
