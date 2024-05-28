import { Injectable, LOCALE_ID, inject } from '@angular/core';
import { LuRelativeTime } from './humanize.model';

@Injectable()
export class LuHumanizeDateFormatter {
	#intlRelativeTimeFormat = new Intl.RelativeTimeFormat(inject(LOCALE_ID));

	format(relativeTime: LuRelativeTime): string {
		return this.#intlRelativeTimeFormat.format(relativeTime.value, relativeTime.unit);
	}
}
