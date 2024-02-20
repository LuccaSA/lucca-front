import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { isToday, isTomorrow } from 'date-fns';
import { getIntl } from '../../../core/translate';
import { LU_POPUP_EMPLOYEE_TRANSLATIONS } from '../../popup-employee.translate';
import { formatDate } from '@angular/common';

@Pipe({
	name: 'leaveEndsDisplay',
	standalone: true,
})
export class LeaveEndsDisplayPipe implements PipeTransform {
	intl = getIntl(LU_POPUP_EMPLOYEE_TRANSLATIONS);
	locale = inject(LOCALE_ID);
	public transform(leaveEndsOn: Date): string {
		if (isToday(leaveEndsOn)) {
			return this.intl.EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL;
		} else if (isTomorrow(leaveEndsOn)) {
			return this.intl.EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_LABEL;
		} else {
			return this.intl.EMPLOYEE_CARD_PANEL_UNTIL_DATE_LABEL.replace('{{date}}', formatDate(leaveEndsOn, 'longDate', this.locale));
		}
	}
}
