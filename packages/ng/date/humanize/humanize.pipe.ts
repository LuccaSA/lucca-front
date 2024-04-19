import { Pipe, PipeTransform, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LuHumanizeFormatter } from './humanize.formatter';
import { LuRelativeTimeFormatUnit } from './humanize.model';
import { relativeTimeTimer } from './humanize.utils';

@Pipe({
	name: 'luHumanize',
	standalone: true,
})
export class LuHumanizePipe implements PipeTransform {
	#formatter = inject(LuHumanizeFormatter, { optional: true }) ?? new LuHumanizeFormatter();

	transform(value: Date | string | number, allowedUnits?: readonly LuRelativeTimeFormatUnit[]): Observable<string> {
		return relativeTimeTimer(new Date(value), allowedUnits).pipe(map((relativeTime) => this.#formatter.format(relativeTime)));
	}
}
