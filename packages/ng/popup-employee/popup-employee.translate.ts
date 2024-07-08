import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_POPUP_EMPLOYEE_TRANSLATIONS = new InjectionToken('LuPopupEmployeeTranslations', {
	factory: () => luPopupEmployeeTranslations,
});

export interface LuPopupEmployeeTranslations {
	EMPLOYEE_CARD_PANEL_COMING_ON_LABEL: string;
	EMPLOYEE_CARD_PANEL_ABSENCE_LABEL: string;
	EMPLOYEE_CARD_PANEL_MORNING_LABEL: string;
	EMPLOYEE_CARD_PANEL_PRESENT_LABEL: string;
	EMPLOYEE_CARD_PANEL_EMPLOYEE_HAS_LEAVED_LABEL: string;
	EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL: string;
	EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL_MORNING: string;
	EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_LABEL: string;
	EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_MORNING_LABEL: string;
	EMPLOYEE_CARD_PANEL_UNTIL_DATE_LABEL: string;
	EMPLOYEE_CARD_PANEL_UNTIL_MORNING_DATE_LABEL: string;
}

export const luPopupEmployeeTranslations: ILuTranslation<LuPopupEmployeeTranslations> = Translations;
