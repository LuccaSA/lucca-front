import { Component, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, ElementRef, Renderer2, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ALuInput } from '@lucca-front/ng/input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getLocaleFirstDayOfWeek, DatePipe, getLocaleDayNames, FormStyle, TranslationWidth } from '@angular/common';
import { LuCalendarItemFactory } from './calendar-item.factory';
import { ICalendarItem } from './calendar-item.interface';



function isSameDay(a: Date, b: Date): boolean {
	return !!a && !!b
		&& a.getFullYear() === b.getFullYear()
		&& a.getMonth() === b.getMonth()
		&& a.getDate() === b.getDate();
}
@Component({
	selector: 'lu-calendar',
	templateUrl: './calendar-input.component.html',
	styleUrls: ['./calendar-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuCalendarInputComponent),
			multi: true,
		},
	],
})
export class LuCalendarInputComponent extends ALuInput<Date> implements ControlValueAccessor, OnInit {
	// daily view
	month: Date;
	header: ICalendarItem;
	items: ICalendarItem[] = [];
	labels: string[] = [];
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_elementRef: ElementRef,
		_renderer: Renderer2,
		@Inject(LOCALE_ID) private _locale: string,
		private _factory: LuCalendarItemFactory,
	) {
		super(_changeDetectorRef, _elementRef, _renderer);
	}
	ngOnInit() {
		this.month = this.value ? new Date(this.value) : new Date();
		this.initDayLabels();
	}
	initDayLabels() {
		this.labels = getLocaleDayNames(this._locale, FormStyle.Standalone, TranslationWidth.Narrow);
		if (getLocaleFirstDayOfWeek(this._locale) === 1) {
			this.labels.push(this.labels.shift());
		}
	}
	protected render() {
		this.renderDailyView();
	}

	protected renderDailyView(month: Date = this.month) {
		this.items = [];
		const start = new Date(month);
		let index = 1;
		const today = new Date();
		start.setDate(index);
		const isFirstDayOfWeek = start.getDay() === getLocaleFirstDayOfWeek(this._locale);
		this.header = this._factory.forgeMonth(month);
		if (!isFirstDayOfWeek) {
			const offset = (start.getDay() - getLocaleFirstDayOfWeek(this._locale) - 1 + 7) % 7;
			index = -1 * offset;
			start.setDate(-1 * offset);
		}
		while (true) {
			const date = new Date(month);
			date.setDate(index++);
			const day = this._factory.forgeDay(date);

			if (index <= 1) {
				day.mods.push('is-previousMonth');
			} else if (date.getMonth() !== month.getMonth()) {
				day.mods.push('is-nextMonth');
			}
			if (isSameDay(date, today)) {
				day.mods.push('is-today');
			}
			if (isSameDay(date, this.value)) {
				day.mods.push('is-active');
			}
			const isNextMonth = index > 1 && day.date.getMonth() !== month.getMonth();
			const isFDOW = day.date.getDay() === getLocaleFirstDayOfWeek(this._locale);
			if (isFDOW && isNextMonth) {
				break;
			} else {
				this.items.push(day);
			}
		}
	}
	select(item: ICalendarItem) {
		this.month = item.date ? new Date(item.date) : new Date();
		this.month.setDate(1);
		this.setValue(item.date);
	}
	previous() {
		this.month = new Date(this.month);
		this.month.setDate(-10);
		this.month.setDate(1);
		this.renderDailyView();
	}
	next() {
		this.month = new Date(this.month);
		this.month.setDate(32);
		this.month.setDate(1);
		this.renderDailyView();
	}
	trackBy(idx, item) { return item.id; }
}
