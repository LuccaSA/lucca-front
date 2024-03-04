import { Pipe, PipeTransform } from '@angular/core';
import { isFuture, isToday } from 'date-fns';

@Pipe({
  name: 'isFuture',
  standalone: true,
})
export class IsFuturePipe implements PipeTransform {
  public transform(value: Date | undefined): boolean {
    return !!value && isFuture(value);
  }
}

@Pipe({
  name: 'isFutureOrToday',
  standalone: true,
})
export class isFutureOrTodayPipe implements PipeTransform {
  public transform(value: Date | undefined): boolean {
    return !value || (isFuture(value) || isToday(value));
  }
}
