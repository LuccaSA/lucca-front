import { Pipe, PipeTransform, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LuHumanizeDateFormatter } from './humanize.formatter';
import { LuRelativeTimeFormatUnit } from './humanize.model';
import { relativeTimeTimer } from './humanize.utils';

@Pipe({
	name: 'luHumanizeDate',
	standalone: true,
})
export class LuHumanizeDatePipe implements PipeTransform {
	#formatter = inject(LuHumanizeDateFormatter, { optional: true }) ?? new LuHumanizeDateFormatter();

	transform(value: Date | string | number, allowedUnits?: readonly LuRelativeTimeFormatUnit[]): Observable<string> {
		return relativeTimeTimer(new Date(value), allowedUnits).pipe(map((relativeTime) => this.#formatter.format(relativeTime)));
	}
}
