import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output, viewChild } from '@angular/core';
import { BasePickerSize } from './base-picker.type';
import { ISO8601Duration } from './date-primitives';
import { TimePickerPartComponent } from './time-picker-part.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '',
})
export abstract class BasePickerComponent {
	readonly step = input<ISO8601Duration>(null);

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly size = input<BasePickerSize>();

	readonly touch = output<void>();

	readonly hoursPart = viewChild<TimePickerPartComponent>('hoursPart');

	readonly minutesPart = viewChild<TimePickerPartComponent>('minutesPart');

	protected readonly hoursIncrement = computed(() => this.getHoursIncrement());
	protected readonly minutesIncrement = computed(() => this.getMinutesIncrement());

	abstract getHoursIncrement(): number;

	abstract getMinutesIncrement(): number;

	protected focusPart(type: 'hours' | 'minutes') {
		if (type === 'hours') {
			if (this.hoursIncrement() === 0) {
				return;
			}

			this.hoursPart()?.focus();
		}
		if (type === 'minutes') {
			if (this.minutesIncrement() === 0) {
				return;
			}

			this.minutesPart()?.focus();
		}
	}
}
