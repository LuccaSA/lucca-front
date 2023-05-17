import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

import { getIntl } from '@lucca-front/ng/core';
import { LuDurationUnit } from '../duration-picker';
import { LU_DURATION_PICKER_TRANSLATIONS } from '../tools';

@Pipe({
	name: 'luDuration',
	pure: true,
	standalone: true,
})
export class LuDurationPipe implements PipeTransform {
	public constructor(@Inject(LOCALE_ID) protected locale: string) {}

	public intl = getIntl(LU_DURATION_PICKER_TRANSLATIONS);

	private dayLabel = this.intl.daysShort;
	private hourLabel = this.intl.hoursShort;
	private minuteLabel = this.intl.minutesShort;
	private secondLabel = this.intl.secondsShort;

	public transform(duration: string, unit: LuDurationUnit, decimalPrecision: number | undefined, displayUnits: string | undefined): string {
		const iso8601DurationRegex = /(-)?P(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/;
		const matches = duration.match(iso8601DurationRegex);

		if (!matches) {
			throw Error('Invalid duration format');
		}

		const sign = matches[1] === undefined ? '' : '\u2212\u00a0';
		const parsedDays = parseInt(matches[2] ?? '0');
		const parsedHours = parseInt(matches[3] ?? '0');
		const parsedMinutes = parseInt(matches[4] ?? '0');
		const parsedSeconds = parseInt(matches[5] ?? '0');

		if (unit === 'day' && decimalPrecision !== undefined) {
			let calculatedDays = parsedDays + parsedHours / 24;
			calculatedDays += parsedMinutes / (24 * 60);
			calculatedDays += parsedSeconds / (24 * 60 * 60);

			return `${sign}${calculatedDays.toFixed(decimalPrecision)}\u00a0${this.dayLabel}`;
		} else if (unit === 'hour' && displayUnits !== undefined) {
			const displayUnitsArray = displayUnits.split(',');
			const calculatedHours = parsedDays * 24 + parsedHours;
			const calculatedMinutes = parsedMinutes + (displayUnitsArray.includes('h') ? 0 : calculatedHours * 60);
			const calculatedSeconds = parsedSeconds + (displayUnitsArray.includes('min') ? 0 : calculatedMinutes * 60);

			return `${sign}
				${
					displayUnitsArray.includes('h')
						? `${calculatedHours.toLocaleString(this.locale, { minimumIntegerDigits: 1 })}\u00a0${this.hourLabel}${
								displayUnitsArray.includes('min') || displayUnitsArray.includes('s') ? '\u00a0' : ''
						  }`
						: ''
				}
				${displayUnitsArray.includes('min') ? `${calculatedMinutes.toLocaleString(this.locale, { minimumIntegerDigits: 2 })}\u00a0${this.minuteLabel}${displayUnitsArray.includes('s') ? '\u00a0' : ''}` : ''}
				${displayUnitsArray.includes('s') ? `${calculatedSeconds.toLocaleString(this.locale, { minimumIntegerDigits: 2 })}\u00a0${this.secondLabel}` : ''}`;
		} else {
			return '';
		}
	}
}
