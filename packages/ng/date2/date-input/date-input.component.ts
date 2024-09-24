import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, model, OnInit, Renderer2, signal, ViewChild, viewChild, viewChildren, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { addMonths, addYears, isSameDay, isSameMonth, startOfMonth, subMonths } from 'date-fns';
import { PopoverDirective } from '../../popover2/popover.directive';
import { Calendar2Component } from '../calendar2/calendar2.component';
import { CellStatus } from '../calendar2/cell-status';
import { CalendarMode } from '../calendar2/calendar-mode';
import { InputDirective } from '../../form-field/input.directive';

@Component({
	selector: 'lu-date-input',
	standalone: true,
	imports: [PopoverDirective, Calendar2Component, IconComponent, InputDirective],
	templateUrl: './date-input.component.html',
	styleUrl: './date-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputComponent {
	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }, 16, 6),
		new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }, 16, 6),
	];

	@ViewChild('popoverTrigger', { read: ElementRef, static: true })
	popoverTrigger: ElementRef<HTMLElement>;

	@ViewChild('date', { read: ElementRef, static: true })
	dateInput: ElementRef<HTMLInputElement>;

	calendarMode = signal<CalendarMode>('month');

	currentDate = model(startOfMonth(new Date()));

	selectedDay = signal<Date | null>(null);

	calendar = viewChild<ElementRef<HTMLDivElement>>('calendar');

	dateSelected: string | undefined;
	dateFormat = 'dd/MM/yyyy';

	#observer: IntersectionObserver;

	getDayInfo = (day: Date): CellStatus => {
		const classes: string[] = [];
		if (isSameDay(day, new Date())) {
			classes.push('is-current');
		}
		if (this.selectedDay() && isSameDay(day, this.selectedDay())) {
			classes.push('is-start', 'is-end');
		}
		return {
			classes,
		};
	};

	constructor() {
		//this.dateSelected = format(this.selectedDay(), this.dateFormat);
		//this.closePopover();
	}

	prev() {
		this.move(-1);
	}

	next() {
		this.move(1);
	}

	move(direction: 1 | -1): void {
		switch (this.calendarMode()) {
			case 'decade':
				this.currentDate.set(addYears(this.currentDate(), direction * 10));
				break;
			case 'year':
				this.currentDate.set(addYears(this.currentDate(), direction));
				break;
			case 'month':
				this.currentDate.set(addMonths(this.currentDate(), direction));
				break;
		}
	}

	openCombobox() {
		// TODO : ne pas déplacer le focus à l’ouverture
	}

	closeCombobox() {
		// TODO : ne pas déplacer le focus à la fermeture
	}
}
