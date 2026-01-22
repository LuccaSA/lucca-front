import { computed, Directive, ElementRef, HostBinding, HostListener, inject, input } from '@angular/core';
import { add, addMonths, addYears, endOfWeek, startOfWeek, sub, subMonths, subYears } from 'date-fns';
import type { Duration } from 'date-fns';
import { WEEK_INFO } from '../calendar.token';
import { comparePeriods, getJSFirstDayOfWeek } from '../utils';
import { CalendarMode } from './calendar-mode';
import { CALENDAR_TABBABLE_DATE } from './calendar2.tokens';

const modeToDurationKey: Record<CalendarMode, keyof Duration> = {
	day: 'days',
	month: 'months',
	year: 'years',
};

@Directive({
	selector: '[luCalendar2Cell]',
})
export class Calendar2CellDirective {
	#host = inject<ElementRef<HTMLButtonElement>>(ElementRef);

	#tabbableDate = inject(CALENDAR_TABBABLE_DATE);
	#weekInfo = inject(WEEK_INFO);

	// Index of this day in the current week display row, not depending on locale, 0 is first day of week and 6 is last
	luCalendar2Cell = input.required<number>();

	luCalendar2Mode = input.required<CalendarMode>();

	luCalendar2Date = input.required<Date>();

	@HostBinding('tabindex')
	get tabindex(): 0 | -1 {
		return this.isTabbableDate() ? 0 : -1;
	}

	isTabbableDate = computed(() => {
		return comparePeriods(this.luCalendar2Mode(), this.luCalendar2Date(), this.#tabbableDate());
	});

	@HostListener('keydown', ['$event'])
	keydown($event: Event): void {
		// See https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/#ex_label for keyboard
		// navigation standards on date pickers
		const cellsPerRow = this.luCalendar2Mode() === 'day' ? 7 : 3;
		const datePropertyToEdit = modeToDurationKey[this.luCalendar2Mode()];
		switch (($event as KeyboardEvent).key) {
			case 'ArrowRight':
				this.#tabbableDate.set(add(this.luCalendar2Date(), { [datePropertyToEdit]: 1 }));
				$event.preventDefault();
				break;
			case 'ArrowLeft':
				this.#tabbableDate.set(sub(this.luCalendar2Date(), { [datePropertyToEdit]: 1 }));
				$event.preventDefault();
				break;
			case 'ArrowDown':
				this.#tabbableDate.set(add(this.luCalendar2Date(), { [datePropertyToEdit]: cellsPerRow }));
				$event.preventDefault();
				break;
			case 'ArrowUp':
				this.#tabbableDate.set(sub(this.luCalendar2Date(), { [datePropertyToEdit]: cellsPerRow }));
				$event.preventDefault();
				break;
			case 'Home':
				if (this.luCalendar2Mode() === 'day') {
					this.#tabbableDate.set(startOfWeek(this.luCalendar2Date(), { weekStartsOn: getJSFirstDayOfWeek(this.#weekInfo) }));
					$event.preventDefault();
				}
				break;
			case 'End':
				if (this.luCalendar2Mode() === 'day') {
					this.#tabbableDate.set(endOfWeek(this.luCalendar2Date(), { weekStartsOn: getJSFirstDayOfWeek(this.#weekInfo) }));
					$event.preventDefault();
				}
				break;
			case 'PageUp':
				if (this.luCalendar2Mode() === 'day') {
					if (($event as KeyboardEvent).shiftKey) {
						this.#tabbableDate.set(subYears(this.luCalendar2Date(), 1));
					} else {
						this.#tabbableDate.set(subMonths(this.luCalendar2Date(), 1));
					}
					$event.preventDefault();
				}
				break;
			case 'PageDown':
				if (this.luCalendar2Mode() === 'day') {
					if (($event as KeyboardEvent).shiftKey) {
						this.#tabbableDate.set(addYears(this.luCalendar2Date(), 1));
					} else {
						this.#tabbableDate.set(addMonths(this.luCalendar2Date(), 1));
					}
					$event.preventDefault();
				}
				break;
		}
	}

	focus(): void {
		this.#host.nativeElement.focus();
	}

	blur(): void {
		this.#host.nativeElement.blur();
	}
}
