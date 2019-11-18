import { Component, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, ElementRef, Renderer2, Inject, LOCALE_ID, OnInit } from '@angular/core';
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
export class LuDateCalendarComponent extends ALuInput<Date> implements ControlValueAccessor, OnInit {
	// daily view
	month: Date;
	days: Date[] = [];
	labels: Date[] = [];
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_elementRef: ElementRef,
		_renderer: Renderer2,
		@Inject(LOCALE_ID) private _locale: string,
	) {
		super(_changeDetectorRef, _elementRef, _renderer);
	}
	set value(v: Date) {
		this.month = v ? new Date(v) : new Date();
		this.month.setDate(1);
		super.value = v;
	}
	ngOnInit() {
		// this.month = this.value ? new Date(this.value) : new Date();
	}
	protected render() {
		this.renderDailyView();
	}

	protected renderDailyView(month: Date = this.month) {
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
		this.labels = this.days.filter((v, i) => i < 7);
	}
	selectDay(day: Date) {
		this.setValue(day);
	}
	previousMonth() {
		this.month = new Date(this.month);
		this.month.setDate(-10);
		this.month.setDate(1);
		this.renderDailyView();
	}
	nextMonth() {
		this.month = new Date(this.month);
		this.month.setDate(32);
		this.month.setDate(1);
		this.renderDailyView();
	}
}
