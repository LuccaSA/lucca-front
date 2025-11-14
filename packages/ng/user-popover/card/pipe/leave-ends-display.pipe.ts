import { formatDate } from '@angular/common';
import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { isToday, isTomorrow } from 'date-fns';
import { LU_POPUP_EMPLOYEE_TRANSLATIONS } from '../../popup-employee.translate';

@Pipe({
	name: 'leaveEndsDisplay',
})
export class LeaveEndsDisplayPipe implements PipeTransform {
	intl = getIntl(LU_POPUP_EMPLOYEE_TRANSLATIONS);
	locale = inject(LOCALE_ID);
	public transform(leaveEndsOn: Date, leaveEndIsFirstHalfDay: boolean): string {
		if (isToday(leaveEndsOn)) {
			if (leaveEndIsFirstHalfDay) {
				return this.intl.EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL_MORNING;
			} else {
				return this.intl.EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL;
			}
		} else if (isTomorrow(leaveEndsOn)) {
			if (leaveEndIsFirstHalfDay) {
				return this.intl.EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_MORNING_LABEL;
			}
			return this.intl.EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_LABEL;
		} else {
			if (leaveEndIsFirstHalfDay) {
				return this.intl.EMPLOYEE_CARD_PANEL_UNTIL_MORNING_DATE_LABEL.replace('{{date}}', formatDate(leaveEndsOn, 'longDate', this.locale));
			}
			return this.intl.EMPLOYEE_CARD_PANEL_UNTIL_DATE_LABEL.replace('{{date}}', formatDate(leaveEndsOn, 'longDate', this.locale));
		}
	}
}
