import { Component, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, ElementRef, Renderer2, Inject, LOCALE_ID, OnInit, Input } from '@angular/core';
import { ALuInput } from '@lucca-front/ng/input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { getLocaleFirstDayOfWeek, getLocaleDayNames, FormStyle, TranslationWidth } from '@angular/common';
import { LuCalendarItemFactory } from './calendar-item.factory';
import { ICalendarItem } from './calendar-item.interface';
import { ALuDateAdapter, ELuDateGranularity } from '@lucca-front/ng/core';

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
		{
			provide: NG_VALIDATORS,
			useExisting: LuCalendarInputComponent,
			multi: true,
		},
	],
})
export class LuCalendarInputComponent<D> extends ALuInput<D> implements ControlValueAccessor, OnInit, Validator {
	@Input() min?: D;
	@Input() max?: D;

	granularity: ELuDateGranularity;
	header: ICalendarItem<D>;
	items: ICalendarItem<D>[] = [];
	get mod() {
		switch (this.granularity) {
			case ELuDateGranularity.year:
				return 'mod-yearlyView';
			case ELuDateGranularity.month:
				return 'mod-monthlyView';
			case ELuDateGranularity.day:
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
		this.granularity = ELuDateGranularity.day;
		this.initDayLabels();
	}
	writeValue(value?: D) {
		const today = this._adapter.forgeToday();
		const date = value && this._adapter.isValid(value) ? this._adapter.clone(value) : today;
		this.header = this._factory.forgeMonth(date);
		super.writeValue(value);
	}
	initDayLabels() {
		this.labels = [...getLocaleDayNames(this._locale, FormStyle.Standalone, TranslationWidth.Narrow)];
		if (getLocaleFirstDayOfWeek(this._locale) === 1) {
			this.labels.push(this.labels.shift());
		}
	}
	protected render() {
		switch (this.granularity) {
			case ELuDateGranularity.year:
				this.renderYearlyView();
				break;
			case ELuDateGranularity.month:
				this.renderMonthlyView();
				break;
			case ELuDateGranularity.day:
			default:
				this.renderDailyView();
				break;
		}
	}

	protected renderDailyView(month: D = this.header.date) {
		this.items = [];
		const start = this._adapter.forge(this._adapter.getYear(month), this._adapter.getMonth(month), 1);
		let index = 0;
		const isFirstDayOfWeek = this._adapter.getDay(start) === getLocaleFirstDayOfWeek(this._locale);
		this.header = this._factory.forgeMonth(month, 'MMMM y');
		if (!isFirstDayOfWeek) {
			const offset = (this._adapter.getDay(start) - getLocaleFirstDayOfWeek(this._locale) + 7) % 7;
			index = -1 * offset;
		}
		while (true) {
			const d = this._adapter.add(start, index++, ELuDateGranularity.day);
			const day = this._factory.forgeDay(d);
			const isNextMonth = this._adapter.compare(d, month, ELuDateGranularity.month) > 0;
			const isFDOW = this._adapter.getDay(d) === getLocaleFirstDayOfWeek(this._locale);
			if (isFDOW && isNextMonth) {
				break;
			} else {
				this.items.push(day);
			}
		}
		this.applyDailyMods();
	}
	protected renderMonthlyView(year: D = this.header.date) {
		this.header = this._factory.forgeYear(year);
		this.items = [...Array(12).keys()].map(i => {
			const d = this._adapter.forge(this._adapter.getYear(year), i + 1, 1);
			return this._factory.forgeMonth(d);
		});
		this.applyMonthlyMods();
	}
	protected renderYearlyView(decade: D = this.header.date) {
		const year = Math.floor(this._adapter.getYear(decade) / 10) * 10;
		const d = this._adapter.forge(year, 1, 1);
		this.header = this._factory.forgeDecade(d);
		this.items = [...Array(10).keys()].map(i => {
			const y = this._adapter.forge(year + i, 1, 1);
			return this._factory.forgeYear(y);
		});
		this.applyYearlyMods();
	}
	protected applyDailyMods() {
		const month = this.header.date;
		const today = this._adapter.forgeToday();
		const min = this.min && this._adapter.isValid(this.min) ? this.min : undefined;
		const max = this.max && this._adapter.isValid(this.max) ? this.max : undefined;
		this.items.forEach(item => {
			const day = item.date;
			if (this._adapter.compare(day, month, ELuDateGranularity.month) < 0) {
				item.mods.push('is-previousMonth');
			}
			if (this._adapter.compare(day, month, ELuDateGranularity.month) > 0) {
				item.mods.push('is-nextMonth');
			}
			if (this._adapter.compare(day, today, ELuDateGranularity.day) === 0) {
				item.mods.push('is-today');
			}
			if (this.value && this._adapter.isValid(this.value) && this._adapter.compare(day, this.value, ELuDateGranularity.day) === 0) {
				item.mods.push('is-active');
			}
			if (min && this._adapter.compare(day, min, ELuDateGranularity.day) < 0) {
				item.mods.push('is-disabled');
			}
			if (max && this._adapter.compare(day, max, ELuDateGranularity.day) > 0) {
				item.mods.push('is-disabled');
			}
		});
	}
	protected applyMonthlyMods() {
		const today = this._adapter.forgeToday();
		const min = this.min && this._adapter.isValid(this.min) ? this.min : undefined;
		const max = this.max && this._adapter.isValid(this.max) ? this.max : undefined;
		this.items.forEach(item => {
			const month = item.date;
			if (this._adapter.compare(month, today, ELuDateGranularity.month) === 0) {
				item.mods.push('is-today');
			}
			if (this.value && this._adapter.isValid(this.value) && this._adapter.compare(month, this.value, ELuDateGranularity.month) === 0) {
				item.mods.push('is-active');
			}
			if (min && this._adapter.compare(month, min, ELuDateGranularity.month) < 0) {
				item.mods.push('is-disabled');
			}
			if (max && this._adapter.compare(month, max, ELuDateGranularity.month) > 0) {
				item.mods.push('is-disabled');
			}
		});
	}
	protected applyYearlyMods() {
		const today = this._adapter.forgeToday();
		const min = this.min && this._adapter.isValid(this.min) ? this.min : undefined;
		const max = this.max && this._adapter.isValid(this.max) ? this.max : undefined;
		this.items.forEach(item => {
			const year = item.date;
			if (this._adapter.compare(year, today, ELuDateGranularity.year) === 0) {
				item.mods.push('is-today');
			}
			if (this.value && this._adapter.isValid(this.value) && this._adapter.compare(year, this.value, ELuDateGranularity.year) === 0) {
				item.mods.push('is-active');
			}
			if (min && this._adapter.compare(year, min, ELuDateGranularity.year) < 0) {
				item.mods.push('is-disabled');
			}
			if (max && this._adapter.compare(year, max, ELuDateGranularity.year) > 0) {
				item.mods.push('is-disabled');
			}
		});
	}
	select(item: ICalendarItem<D>) {
		switch (this.granularity) {
			case ELuDateGranularity.year:
				this.selectYear(item);
				break;
			case ELuDateGranularity.month:
				this.selectMonth(item);
				break;
			case ELuDateGranularity.day:
			default:
				this.selectDay(item);
				break;
		}
	}
	protected selectDay(item: ICalendarItem<D>) {
		const year = this._adapter.getYear(item.date);
		const month = this._adapter.getMonth(item.date);
		const d = this._adapter.forge(year, month, 1);
		this.header = this._factory.forgeMonth(d);
		this.setValue(item.date);
	}
	protected selectMonth(item: ICalendarItem<D>) {
		this.header = item;
		this.granularity = ELuDateGranularity.day;
		this.render();
	}
	protected selectYear(item: ICalendarItem<D>) {
		this.header = item;
		this.granularity = ELuDateGranularity.month;
		this.render();
	}

	previous() {
		switch (this.granularity) {
			case ELuDateGranularity.year:
				this.previousDecade();
				break;
			case ELuDateGranularity.month:
				this.previousYear();
				break;
			case ELuDateGranularity.day:
			default:
				this.previousMonth();
				break;
		}
		this.render();
	}
	next() {
		switch (this.granularity) {
			case ELuDateGranularity.year:
				this.nextDecade();
				break;
			case ELuDateGranularity.month:
				this.nextYear();
				break;
			case ELuDateGranularity.day:
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
		const d = this._adapter.add(this.header.date, 1, ELuDateGranularity.month);
		this.header = this._factory.forgeMonth(d);
	}
	protected nextYear() {
		const d = this._adapter.add(this.header.date, 1, ELuDateGranularity.year);
		this.header = this._factory.forgeYear(d);
	}
	protected nextDecade() {
		const d = this._adapter.add(this.header.date, 1, ELuDateGranularity.decade);
		this.header = this._factory.forgeDecade(d);
	}
	protected previousMonth() {
		const d = this._adapter.add(this.header.date, -1, ELuDateGranularity.month);
		this.header = this._factory.forgeMonth(d);
	}
	protected previousYear() {
		const d = this._adapter.add(this.header.date, -1, ELuDateGranularity.year);
		this.header = this._factory.forgeYear(d);
	}
	protected previousDecade() {
		const d = this._adapter.add(this.header.date, -1, ELuDateGranularity.decade);
		this.header = this._factory.forgeDecade(d);
	}

	validate(control: AbstractControl): ValidationErrors | null {
		const d = control.value;
		if (!d) { return null; }
		if (!this._adapter.isValid(d)) { return { 'date': true }; }
		if (!!this.min && this._adapter.isValid(this.min) && this._adapter.compare(this.min, d, ELuDateGranularity.day) > 0) {
			return { 'min': true };
		}
		if (!!this.max && this._adapter.isValid(this.max) && this._adapter.compare(this.max, d, ELuDateGranularity.day) < 0) {
			return { 'max': true };
		}
		return null;
	}
}
