import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, model, OnInit, Renderer2, signal, viewChild, viewChildren, ViewEncapsulation } from '@angular/core';
import { addMonths, isSameDay, isSameMonth, startOfMonth } from 'date-fns';
import { PopoverDirective } from '../../popover2/popover.directive';
import { Calendar2Component } from '../calendar2/calendar2.component';
import { DayStatus } from '../calendar2/day-status';

@Component({
	selector: 'lu-date-input',
	standalone: true,
	imports: [PopoverDirective, Calendar2Component],
	templateUrl: './date-input.component.html',
	styleUrl: './date-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputComponent implements OnInit {
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
			setTimeout(() => {
				this.months().forEach((month) => {
					this.#observer.observe(month.elementRef.nativeElement);
				});
			}, 1000);
		});

		effect(() => {
			console.log(this.currentMonth());
		});
	}

	prev() {
		console.log('prev');
	}

	next() {
		const target = this.months().find((el) => {
			return isSameMonth(el.month(), addMonths(this.currentMonth(), 1));
		});

		target.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
	}

	ngOnInit(): void {
		setTimeout(() => {
			const target = this.months().find((el) => {
				return isSameMonth(el.month(), this.currentMonth());
			});
			console.log(target);

			target.elementRef.nativeElement.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });
		}, 500);

		this.#observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.#renderer.removeAttribute(entry.target, 'inert');
						const currentChild = this.months().find((el) => {
							return entry.target === el.elementRef.nativeElement;
						});
						this.currentMonth.set(currentChild.month());
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
