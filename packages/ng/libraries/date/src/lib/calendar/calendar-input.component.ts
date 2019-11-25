import { Component, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, ElementRef, Renderer2, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ALuInput } from '@lucca-front/ng/input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getLocaleFirstDayOfWeek, getLocaleDayNames, FormStyle, TranslationWidth } from '@angular/common';
import { LuCalendarItemFactory } from './calendar-item.factory';
import { ICalendarItem } from './calendar-item.interface';
import { ALuDateAdapter, DateGranularity } from '../adapter/index';

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
export class LuCalendarInputComponent<D> extends ALuInput<D> implements ControlValueAccessor, OnInit {
	granularity: DateGranularity;
	header: ICalendarItem<D>;
	items: ICalendarItem<D>[] = [];
	get mod() {
		switch (this.granularity) {
			case DateGranularity.year:
				return 'mod-yearlyView';
			case DateGranularity.month:
				return 'mod-monthlyView';
			case DateGranularity.day:
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
		private _factory: LuCalendarItemFactory<D>,
		private _adapter: ALuDateAdapter<D>,
	) {
		super(_changeDetectorRef, _elementRef, _renderer);
	}
	ngOnInit() {
		this.granularity = DateGranularity.day;
		this.initDayLabels();
	}
	writeValue(value?: D) {
		const t = new Date();
		const today = this._adapter.forge(t.getFullYear(), t.getMonth(), t.getDate());
		const date = value ? this._adapter.clone(value) : today;
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
			case DateGranularity.year:
				this.renderYearlyView();
				break;
			case DateGranularity.month:
				this.renderMonthlyView();
				break;
			case DateGranularity.day:
			default:
				this.renderDailyView();
				break;
		}
	}

	protected renderDailyView(month: D = this.header.date) {
		// TODO - fix it
		this.items = [];
		const start = new Date(this._adapter.getYear(month), this._adapter.getMonth(month) - 1, 1);
		let index = 1;
		const t = new Date();
		const today = this._adapter.forge(t.getFullYear(), t.getMonth() + 1, t.getDate());
		// start.setDate(index);
		const isFirstDayOfWeek = start.getDay() === getLocaleFirstDayOfWeek(this._locale);
		this.header = this._factory.forgeMonth(month, 'MMMM y');
		if (!isFirstDayOfWeek) {
			const offset = (start.getDay() - getLocaleFirstDayOfWeek(this._locale) - 1 + 7) % 7;
			index = -1 * offset;
			start.setDate(-1 * offset);
		}
		while (true) {
			const date = new Date(this._adapter.getYear(month), this._adapter.getMonth(month) - 1, 1);
			date.setDate(index++);
			const d = this._adapter.forge(date.getFullYear(), date.getMonth() + 1, date.getDate());
			const day = this._factory.forgeDay(d);

			if (this._adapter.compare(d, month, DateGranularity.month) < 0) {
				day.mods.push('is-previousMonth');
			}
			if (this._adapter.compare(d, month, DateGranularity.month) > 0) {
				day.mods.push('is-nextMonth');
			}
			if (this._adapter.compare(d, today, DateGranularity.day) === 0) {
				day.mods.push('is-today');
			}
			if (this.value && this._adapter.isValid(this.value) && this._adapter.compare(d, this.value, DateGranularity.day) === 0) {
				day.mods.push('is-active');
			}
			const isNextMonth = this._adapter.compare(d, month, DateGranularity.month) > 0;
			const isFDOW = date.getDay() === getLocaleFirstDayOfWeek(this._locale);
			if (isFDOW && isNextMonth) {
				break;
			} else {
				this.items.push(day);
			}
		}
	}
	protected renderMonthlyView(year: D = this.header.date) {
		this.header = this._factory.forgeYear(year);
		this.items = [...Array(12).keys()].map(i => {
			const d = this._adapter.forge(this._adapter.getYear(year), i + 1, 1);
			return this._factory.forgeMonth(d);
		});
	}
	protected renderYearlyView(decade: D = this.header.date) {
		this.header = this._factory.forgeDecade(decade);
		this.items = [...Array(10).keys()].map(i => {
			const d = this._adapter.forge(this._adapter.getYear(decade) + i, 1, 1);
			return this._factory.forgeYear(d);
		});
	}
	select(item: ICalendarItem<D>) {
		switch (this.granularity) {
			case DateGranularity.year:
				this.selectYear(item);
				break;
			case DateGranularity.month:
				this.selectMonth(item);
				break;
			case DateGranularity.day:
			default:
				this.selectDay(item);
				break;
		}
	}
	protected selectDay(item: ICalendarItem<D>) {
		// const date = item.date ? new Date(item.date) : new Date();
		// date.setDate(1);
		const year = this._adapter.getYear(item.date);
		const month = this._adapter.getMonth(item.date);
		const d = this._adapter.forge(year, month, 1);
		this.header = this._factory.forgeMonth(d);
		this.setValue(item.date);
	}
	protected selectMonth(item: ICalendarItem<D>) {
		this.header = item;
		this.granularity = DateGranularity.day;
		this.render();
	}
	protected selectYear(item: ICalendarItem<D>) {
		this.header = item;
		this.granularity = DateGranularity.month;
		this.render();
	}

	previous() {
		switch (this.granularity) {
			case DateGranularity.year:
				this.previousDecade();
				break;
			case DateGranularity.month:
				this.previousYear();
				break;
			case DateGranularity.day:
			default:
				this.previousMonth();
				break;
		}
		this.render();
	}
	next() {
		switch (this.granularity) {
			case DateGranularity.year:
				this.nextDecade();
				break;
			case DateGranularity.month:
				this.nextYear();
				break;
			case DateGranularity.day:
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
	// TODO - fix
	protected nextMonth() {
		// const date = new Date(this.header.date);
		// date.setDate(32);
		// date.setDate(1);
		// this.header = this._factory.forgeMonth(date);
	}
	protected nextYear() {
		// const date = new Date(this.header.date);
		// date.setFullYear(date.getFullYear() + 1);
		// date.setDate(1);
		// this.header = this._factory.forgeYear(date);
	}
	protected nextDecade() {
		// const date = new Date(this.header.date);
		// date.setFullYear(date.getFullYear() + 10);
		// this.header = this._factory.forgeDecade(date);
	}
	protected previousMonth() {
		// const date = new Date(this.header.date);
		// date.setDate(-10);
		// date.setDate(1);
		// this.header = this._factory.forgeMonth(date);
	}
	protected previousYear() {
		// const date = new Date(this.header.date);
		// date.setFullYear(date.getFullYear() - 1);
		// this.header = this._factory.forgeYear(date);
	}
	protected previousDecade() {
		// const date = new Date(this.header.date);
		// date.setFullYear(date.getFullYear() - 10);
		// this.header = this._factory.forgeDecade(date);
	}
}
