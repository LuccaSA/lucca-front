import { Pipe, PipeTransform } from '@angular/core';
import { isToday, isTomorrow } from 'date-fns';

@Pipe({
	name: 'leaveEndsDisplay',
	standalone: true,
})
export class LeaveEndsDisplayPipe implements PipeTransform {
	public transform(leaveEndsOn: Date): string {
		if (isToday(leaveEndsOn)) {
			return 'EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL';
		} else if (isTomorrow(leaveEndsOn)) {
			return 'EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_LABEL';
		} else {
			return 'EMPLOYEE_CARD_PANEL_UNTIL_DATE_LABEL';
			// { date: leaveEndsOn };
		}
	}
}
