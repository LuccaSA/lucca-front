import { Pipe, PipeTransform } from '@angular/core';
import { isFuture, isToday } from 'date-fns';

@Pipe({
	name: 'isFuture',
})
export class IsFuturePipe implements PipeTransform {
	public transform(value: Date | undefined): boolean {
		return !!value && isFuture(value);
	}
}

@Pipe({
	name: 'isFutureOrToday',
})
export class IsFutureOrTodayPipe implements PipeTransform {
	public transform(value: Date | undefined): boolean {
		return !value || isFuture(value) || isToday(value);
	}
}
