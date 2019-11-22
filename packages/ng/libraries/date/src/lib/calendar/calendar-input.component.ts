import { Component, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, ElementRef, Renderer2, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ALuInput } from '@lucca-front/ng/input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getLocaleFirstDayOfWeek, getLocaleDayNames, FormStyle, TranslationWidth } from '@angular/common';
import { LuCalendarItemFactory } from './calendar-item.factory';
import { ICalendarItem, CalendarGranularity } from './calendar-item.interface';
import { LuDateAdapter } from '../input/date.adapter';



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
	granularity: CalendarGranularity;
	header: ICalendarItem;
	items: ICalendarItem[] = [];
	get mod() {
		switch (this.granularity) {
			case CalendarGranularity.year:
				return 'mod-yearlyView';
			case CalendarGranularity.month:
				return 'mod-monthlyView';
			case CalendarGranularity.day:
				return 'mod-dailyView';
		}
	}
	// daily view
	labels: string[] = [];
	constructor(
		_changeDetectorRef: ChangeDetectorRef,
		_elementRef: ElementRef,
		_renderer: Renderer2,
		@Inject(LOCALE_ID) private _locale: string,
		private _factory: LuCalendarItemFactory,
		private _adapter: LuDateAdapter,
	) {
		super(_changeDetectorRef, _elementRef, _renderer);
	}
	ngOnInit() {
		this.granularity = CalendarGranularity.day;
		this.initDayLabels();
	}
	writeValue(value?: Date) {
		const date = value ? new Date(value) : new Date();
		this.header = this._factory.forgeMonth(date);
		super.writeValue(value);
	}
	initDayLabels() {
		this.labels = getLocaleDayNames(this._locale, FormStyle.Standalone, TranslationWidth.Narrow);
		if (getLocaleFirstDayOfWeek(this._locale) === 1) {
			this.labels.push(this.labels.shift());
		}
	}
	protected render() {
		switch (this.granularity) {
			case CalendarGranularity.year:
				this.renderYearlyView();
				break;
			case CalendarGranularity.month:
				this.renderMonthlyView();
				break;
			case CalendarGranularity.day:
			default:
				this.renderDailyView();
				break;
		}
	}

	protected renderDailyView(month: Date = this.header.date) {
		this.items = [];
		const start = new Date(month);
		let index = 1;
		const today = new Date();
		start.setDate(index);
		const isFirstDayOfWeek = start.getDay() === getLocaleFirstDayOfWeek(this._locale);
		this.header = this._factory.forgeMonth(month, 'MMMM y');
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
	protected renderMonthlyView(year: Date = this.header.date) {
		this.header = this._factory.forgeYear(year);
		this.items = [...Array(12).keys()].map(i => {
			const date = new Date(year);
			date.setMonth(i);
			return this._factory.forgeMonth(date);
		});
	}
	protected renderYearlyView(decade: Date = this.header.date) {
		this.header = this._factory.forgeDecade(decade);
		this.items = [...Array(10).keys()].map(i => {
			const date = new Date(this.header.date);
			date.setFullYear(this.header.date.getFullYear() + i);
			return this._factory.forgeYear(date);
		});
	}
	select(item: ICalendarItem) {
		switch (this.granularity) {
			case CalendarGranularity.year:
				this.selectYear(item);
				break;
			case CalendarGranularity.month:
				this.selectMonth(item);
				break;
			case CalendarGranularity.day:
			default:
				this.selectDay(item);
				break;
		}
	}
	protected selectDay(item: ICalendarItem) {
		const date = item.date ? new Date(item.date) : new Date();
		date.setDate(1);
		this.header = this._factory.forgeMonth(date);
		this.setValue(item.date);
	}
	protected selectMonth(item: ICalendarItem) {
		this.header = item;
		this.granularity = CalendarGranularity.day;
		this.render();
	}
	protected selectYear(item: ICalendarItem) {
		this.header = item;
		this.granularity = CalendarGranularity.month;
		this.render();
	}

	previous() {
		// todo - handle granularity
		switch (this.granularity) {
			case CalendarGranularity.year:
				this.previousDecade();
				break;
			case CalendarGranularity.month:
				this.previousYear();
				break;
			case CalendarGranularity.day:
			default:
				this.previousMonth();
				break;
		}
		this.render();
	}
	next() {
		switch (this.granularity) {
			case CalendarGranularity.year:
				this.nextDecade();
				break;
			case CalendarGranularity.month:
				this.nextYear();
				break;
			case CalendarGranularity.day:
			default:
				this.nextMonth();
				break;
		}
		this.render();
	}
	trackBy(idx, item) { return item.id; }
	changeGranularity() {
		this.granularity = this.header.granularity;
		this.render();
	}
	protected nextMonth() {
		const date = new Date(this.header.date);
		date.setDate(32);
		date.setDate(1);
		this.header = this._factory.forgeMonth(date);
	}
	protected nextYear() {
		const date = new Date(this.header.date);
		date.setFullYear(date.getFullYear() + 1);
		date.setDate(1);
		this.header = this._factory.forgeYear(date);
	}
	protected nextDecade() {
		const date = new Date(this.header.date);
		date.setFullYear(date.getFullYear() + 10);
		this.header = this._factory.forgeDecade(date);
	}
	protected previousMonth() {
		const date = new Date(this.header.date);
		date.setDate(-10);
		date.setDate(1);
		this.header = this._factory.forgeMonth(date);
	}
	protected previousYear() {
		const date = new Date(this.header.date);
		date.setFullYear(date.getFullYear() - 1);
		this.header = this._factory.forgeYear(date);
	}
	protected previousDecade() {
		const date = new Date(this.header.date);
		date.setFullYear(date.getFullYear() - 10);
		this.header = this._factory.forgeDecade(date);
	}
}
