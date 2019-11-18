import { Component, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, ElementRef, Renderer2, Inject, LOCALE_ID } from '@angular/core';
import { ALuInput } from '@lucca-front/ng/input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
	selector: 'lu-date-calendar',
	templateUrl: './date-calendar.component.html',
	styleUrls: ['./date-calendar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuDateCalendarComponent),
			multi: true,
		},
	],
})
export class LuDateCalendarComponent extends ALuInput implements ControlValueAccessor {
	// daily view
	days = [];
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_elementRef: ElementRef,
		_renderer: Renderer2,
		@Inject(LOCALE_ID) private _locale: string,
	) {
		super(_changeDetectorRef, _elementRef, _renderer);
	}
	protected render() {
		const month = new Date();
		month.setMonth(11);
		this.renderDailyView(month);
	}

	protected renderDailyView(month: Date) {
		this.days = [];
		const start = new Date(month);
		let index = 1;
		start.setDate(index);
		const isFirstDayOfWeek = start.getDay() === getLocaleFirstDayOfWeek(this._locale);
		if (!isFirstDayOfWeek) {
			const offset = (start.getDay() - getLocaleFirstDayOfWeek(this._locale) - 1 + 7) % 7;
			index = -1 * offset;
			start.setDate(-1 * offset);
		}
		while (true) {
			const day = new Date(month);
			day.setDate(index++);
			const isNextMonth = index > 1 && day.getMonth() !== month.getMonth();
			const isFDOW = day.getDay() === getLocaleFirstDayOfWeek(this._locale);
			if (isFDOW && isNextMonth) {
				break;
			} else {
				this.days.push(day);
			}
		}
	}
	selectDay(day: Date) {
		this.setValue(day);
	}
}
