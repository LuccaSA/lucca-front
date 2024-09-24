import { computed, Directive, ElementRef, HostBinding, HostListener, inject, input, OnInit } from '@angular/core';
import { CALENDAR_CELLS } from './calendar2.tokens';
import { CalendarMode } from './calendar-mode';

@Directive({
	selector: '[luCalendar2Cell]',
	standalone: true,
})
export class Calendar2DCellDirective implements OnInit {
	#host = inject<ElementRef<HTMLButtonElement>>(ElementRef);

	#cells = inject(CALENDAR_CELLS);

	// Index of this day in the current week display row, not depending on locale, 0 is first day of week and 6 is last
	luCalendar2Cell = input.required<number>();

	luCalendar2FirstCellOfGrid = input.required<boolean>();

	luCalendar2Mode = input.required<CalendarMode>();

	firstDayOfWeek = computed(() => this.luCalendar2Mode() === 'month' && this.luCalendar2Cell() === 0);

	lastDayOfWeek = computed(() => this.luCalendar2Mode() === 'month' && this.luCalendar2Cell() === 6);

	@HostBinding('tabindex')
	tabindex: 0 | -1;

	@HostListener('keydown', ['$event'])
	keydown($event: KeyboardEvent): void {
		let target: Calendar2DCellDirective;
		const thisIndex = this.#cells().indexOf(this);
		const cellsPerRow = this.luCalendar2Mode() === 'month' ? 7 : 3;
		switch ($event.key) {
			case 'ArrowRight':
				target = this.#cells()[thisIndex + 1];
				break;
			case 'ArrowLeft':
				target = this.#cells()[thisIndex - 1];
				break;
			case 'ArrowDown':
				target = this.#cells()[thisIndex + cellsPerRow];
				break;
			case 'ArrowUp':
				target = this.#cells()[thisIndex - cellsPerRow];
				break;
			case 'Home':
				if (this.luCalendar2Mode() === 'month') {
					target = this.#cells()
						.slice(thisIndex - 7, thisIndex)
						.find((day) => day.firstDayOfWeek());
				}
				break;
			case 'End':
				if (this.luCalendar2Mode() === 'month') {
					target = this.#cells()
						.slice(thisIndex, thisIndex + 7)
						.find((day) => day.lastDayOfWeek());
				}
				break;
		}
		if (target) {
			$event.preventDefault();
			this.#moveFocus(target);
		}
	}

	#moveFocus(target: Calendar2DCellDirective): void {
		// Only the currently focused day should be focusable so we first set tabindex
		// to -1 on current before focusing the next one
		this.blur();
		target.focus();
	}

	blur(): void {
		this.tabindex = -1;
	}

	focus(): void {
		this.tabindex = 0;
		this.#host.nativeElement.focus();
	}

	ngOnInit(): void {
		// Init tabindex to 0 for first day of calendar, else -1.
		// We don't want a computed here because this should be done only on init
		this.tabindex = this.luCalendar2FirstCellOfGrid() ? 0 : -1;
	}
}
