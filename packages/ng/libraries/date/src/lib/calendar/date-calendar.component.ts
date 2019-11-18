import { Component, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, ElementRef, Renderer2, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ALuInput } from '@lucca-front/ng/input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getLocaleFirstDayOfWeek } from '@angular/common';

interface IDay {
	id: string;
	date: Date;
	mods: string[];
}
function isSameDay(a: Date, b: Date): boolean {
	return !!a && !!b
		&& a.getFullYear() === b.getFullYear()
		&& a.getMonth() === b.getMonth()
		&& a.getDate() === b.getDate();
}
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
	days: IDay[] = [];
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
	get value() { return super.value; }
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
		const today = new Date();
		start.setDate(index);
		const isFirstDayOfWeek = start.getDay() === getLocaleFirstDayOfWeek(this._locale);
		if (!isFirstDayOfWeek) {
			const offset = (start.getDay() - getLocaleFirstDayOfWeek(this._locale) - 1 + 7) % 7;
			index = -1 * offset;
			start.setDate(-1 * offset);
		}
		while (true) {
			const day = { date: new Date(month), mods: [], id: '' } as IDay;
			day.date.setDate(index++);
			day.id = day.date.toISOString();
			if (index <= 1) {
				day.mods.push('is-previousMonth');
			} else if (day.date.getMonth() !== month.getMonth()) {
				day.mods.push('is-nextMonth');
			}
			if (isSameDay(day.date, today)) {
				day.mods.push('is-today');
			}
			if (isSameDay(day.date, this.value)) {
				day.mods.push('is-active');
			}
			console.log(isSameDay(day.date, this.value))
			const isNextMonth = index > 1 && day.date.getMonth() !== month.getMonth();
			const isFDOW = day.date.getDay() === getLocaleFirstDayOfWeek(this._locale);
			if (isFDOW && isNextMonth) {
				break;
			} else {
				this.days.push(day);
			}
		}
		this.labels = this.days.filter((v, i) => i < 7).map(d => d.date);
	}
	selectDay(day: IDay) {
		this.setValue(day.date);
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
	trackBy(idx, item) { return item.id; }
}
