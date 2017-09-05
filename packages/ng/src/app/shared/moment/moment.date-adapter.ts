import {DateAdapter} from '@angular/material';
import * as moment from 'moment';
import {Injectable} from '@angular/core';

@Injectable()
export class MomentDateAdapter extends DateAdapter<moment.Moment> {
	locale: string;

	getYear(date: moment.Moment): number {
		return date.year();
	}

	getMonth(date: moment.Moment): number {
		return date.month();
	}

	getDate(date: moment.Moment): number {
		return date.date();
	}

	getDayOfWeek(date: moment.Moment): number {
		return date.day();
	}

	getMonthNames(style: 'long' | 'short'): string[] {
		return style === 'long' ? moment.months() : moment.monthsShort();
	}

	getDateNames(): string[] {
		const toReturn = [];
		for( let i = 0 ; i < 31; i++) {
		toReturn[i] = String(i + 1);
		}
		return toReturn;
	}

	getDayOfWeekNames(style: 'long' | 'short'): string[] {
		return style === 'long' ? moment.weekdays() : moment.weekdaysShort();
	}

	getYearName(date: moment.Moment): string {
		return '' + this.getYear(date);
	}

	getFirstDayOfWeek(): number {
		return moment.localeData().firstDayOfWeek();
	}

	getNumDaysInMonth(date: moment.Moment): number {
		return date.daysInMonth();
	}

	clone(date: moment.Moment): moment.Moment {
		return date.clone();
	}

	createDate(year: number, month: number, date: number): moment.Moment {
		return moment(`${year} ${month} ${date}`, 'YYYY MM DD').add(1, 'month');
	}

	today(): moment.Moment {
		return moment().startOf('day');
	}

	parse(value: any, parseFormat: any): any | moment.Moment {
		if (!parseFormat) {
			parseFormat = moment.locale().includes('fr') ? 'DDMMYYYY' : 'MMDDYYYY';
		}
		return moment(value, parseFormat);
	}

	format(date: moment.Moment, displayFormat: any): string {
		return date.format(displayFormat);
	}

	private add(date: moment.Moment, num: number, type: 'days' | 'months' | 'years') {
		let afterAdd = moment(date);
		afterAdd.add(num, type);
		console.log('before', date.format('LL'))
		console.log('after', afterAdd.format('LL'))
		return afterAdd;
	}

	addCalendarYears(date: moment.Moment, years: number): moment.Moment {
		return this.add(date, years, 'years');
	}

	addCalendarMonths(date: moment.Moment, months: number): moment.Moment {
		return this.add(date, months, 'months');
	}

	addCalendarDays(date: moment.Moment, days: number): moment.Moment {
		return this.add(date, days, 'days');
	}

	getISODateString(date: moment.Moment): string {
		return date.format();
	}

	isDateInstance(obj: any): boolean {
		return moment.isMoment(obj);
	}

	isValid(date: moment.Moment): boolean {
		return date.isValid();
	}

	setLocale(locale: any): void {
		moment.locale(locale);
		this.locale = locale;
	}

	compareDate(first: moment.Moment, second: moment.Moment): number {
		return first.isAfter(second) ? 1 : this.sameDate(first, second) ? 0 : -1;
	}

	sameDate(first: any | moment.Moment, second: any | moment.Moment): boolean {
		return moment(first).isSame(moment(second));
	}

	clampDate(date: moment.Moment, min?: any | moment.Moment, max?: any | moment.Moment): moment.Moment {
		const minDate = moment(min);
		const maxDate = moment(max);
		return date.isSameOrBefore(minDate) ? minDate : date.isSameOrAfter(maxDate) ? maxDate : date;
	}

}
