import { computed, Directive, ElementRef, HostBinding, HostListener, inject, input, OnInit } from '@angular/core';
import { CALENDAR_DAYS } from './calendar2.tokens';

@Directive({
	selector: '[luCalendar2Day]',
	standalone: true,
})
export class Calendar2DayDirective implements OnInit {
	#host = inject<ElementRef<HTMLButtonElement>>(ElementRef);

	#days = inject(CALENDAR_DAYS);

	// Index of this day in the current week display row, not depending on locale, 0 is first day of week and 6 is last
	luCalendar2Day = input<number>();

	luCalendar2FirstDayOfMonth = input<boolean>();

	firstDayOfWeek = computed(() => this.luCalendar2Day() === 0);

	lastDayOfWeek = computed(() => this.luCalendar2Day() === 6);

	@HostBinding('tabindex')
	tabindex: 0 | -1;

	@HostListener('keydown', ['$event'])
	keydown($event: KeyboardEvent): void {
		let target: Calendar2DayDirective;
		const thisIndex = this.#days().indexOf(this);
		switch ($event.key) {
			case 'ArrowRight':
				target = this.#days()[thisIndex + 1];
				break;
			case 'ArrowLeft':
				target = this.#days()[thisIndex - 1];
				break;
			case 'ArrowDown':
				target = this.#days()[thisIndex + 7];
				break;
			case 'ArrowUp':
				target = this.#days()[thisIndex - 7];
				break;
			case 'Home':
				target = this.#days()
					.slice(thisIndex - 7, thisIndex)
					.find((day) => day.firstDayOfWeek());
				break;
			case 'End':
				target = this.#days()
					.slice(thisIndex, thisIndex + 7)
					.find((day) => day.lastDayOfWeek());
				break;
		}
		if (target) {
			$event.preventDefault();
			this.#moveFocus(target);
		}
	}

	#moveFocus(target: Calendar2DayDirective): void {
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
		this.tabindex = this.luCalendar2FirstDayOfMonth() ? 0 : -1;
	}
}
