import { Injectable, Inject, LOCALE_ID } from '@angular/core';

@Injectable()
export class LuDateAdapter {
	constructor(
		@Inject(LOCALE_ID) private _locale: string,
	) {

	}
	isValidText(text: string): boolean {
		return true;
	}
	parseText(text: string): Date {
		if (!this.isValidText(text)) {
			return undefined;
		}
		const groups = text.split(/\s/i);
		const date = parseInt(groups[0], 10);
		const month = parseInt(groups[1], 10);
		const year = parseInt(groups[2], 10);
		return new Date(year, month - 1, date); // month-1 cuz 0 -> january
	}
}
