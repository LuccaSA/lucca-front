import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, model, OnInit, Renderer2, signal, viewChild, viewChildren, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { addMonths, format, isSameDay, startOfMonth } from 'date-fns';
import { PopoverDirective } from '../../popover2/popover.directive';
import { Calendar2Component } from '../calendar2/calendar2.component';
import { DayStatus } from '../calendar2/day-status';

@Component({
	selector: 'lu-date-input',
	standalone: true,
	imports: [PopoverDirective, Calendar2Component, IconComponent],
	templateUrl: './date-input.component.html',
	styleUrl: './date-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputComponent implements OnInit {
	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }, 16, 6),
		new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }, 16, -6),
	];

	#renderer = inject(Renderer2);

	currentMonth = model(startOfMonth(new Date()));
	display = computed(() => {
		return [-2, -1, 0, 1, 2].map((offset) => {
			return addMonths(this.currentMonth(), offset);
		});
	});

	selectedDay = signal<Date | null>(null);

	calendar = viewChild<ElementRef<HTMLDivElement>>('calendar');

	months = viewChildren<Calendar2Component>(Calendar2Component);

	dateSelected: string | undefined;
	dateFormat = 'dd/MM/yyyy';

	#observer: IntersectionObserver;

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

	constructor() {
		effect(() => {
			this.months().forEach((month) => {
				this.#observer.observe(month.elementRef.nativeElement);
			});
		});

		effect(() => {
			this.dateSelected = format(this.selectedDay(), this.dateFormat);
		});
	}

	prev() {}

	next() {
		// const target = this.months().find((el) => {
		// 	return isSameMonth(el.month(), addMonths(this.currentMonth(), 1));
		// });
		// target.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
	}

	ngOnInit(): void {
		// const target = this.months().find((el) => {
		// 	return isSameMonth(el.month(), this.currentMonth());
		// 	console.log(target);
		// });

		// target.elementRef.nativeElement.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });

		this.#observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.#renderer.removeAttribute(entry.target, 'inert');
						// const currentChild = this.months().find((el) => {
						// 	return entry.target === el.elementRef.nativeElement;
						// });
						// this.currentMonth.set(currentChild.month());
					} else {
						this.#renderer.setAttribute(entry.target, 'inert', 'inert');
					}
				});
			},
			{
				root: this.calendar().nativeElement,
				rootMargin: '0px',
				threshold: 0.75,
			},
		);
	}
}
