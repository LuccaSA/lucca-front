import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { PopoverDirective } from '../../popover2/popover.directive';
import { Calendar2Component } from '../calendar2/calendar2.component';
import { DayStatus } from '../calendar2/day-status';
import { isSameDay } from 'date-fns';

@Component({
	selector: 'lu-date-input',
	standalone: true,
	imports: [PopoverDirective, Calendar2Component],
	templateUrl: './date-input.component.html',
	styleUrl: './date-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputComponent {
	selectedDay = signal<Date | null>(null);

	getDayInfo = (day: Date): DayStatus => {
		const classes: string[] = [];
		if (isSameDay(day, new Date())) {
			classes.push('is-today');
		}
		if (this.selectedDay() && isSameDay(day, this.selectedDay())) {
			classes.push('is-start', 'is-end');
		}
		return {
			classes,
		};
	};
}
