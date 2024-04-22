import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

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

export const luPopupEmployeeTranslations: ILuTranslation<LuPopupEmployeeTranslations> = {
	en: {
		EMPLOYEE_CARD_PANEL_COMING_ON_LABEL: 'Arrival expected on {{date}}',
		EMPLOYEE_CARD_PANEL_ABSENCE_LABEL: 'Absent',
		EMPLOYEE_CARD_PANEL_MORNING_LABEL: 'Morning',
		EMPLOYEE_CARD_PANEL_PRESENT_LABEL: 'Present',
		EMPLOYEE_CARD_PANEL_EMPLOYEE_HAS_LEAVED_LABEL: 'Left',
		EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL: 'Today',
		EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL_MORNING: 'This morning',
		EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_LABEL: 'Until tomorrow',
		EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_MORNING_LABEL: 'Until tomorrow morning',
		EMPLOYEE_CARD_PANEL_UNTIL_DATE_LABEL: 'Until {{date}} included',
		EMPLOYEE_CARD_PANEL_UNTIL_MORNING_DATE_LABEL: 'Until {{date}} morning',
	},
	fr: {
		EMPLOYEE_CARD_PANEL_COMING_ON_LABEL: 'Arrivée prévue le {{date}}',
		EMPLOYEE_CARD_PANEL_ABSENCE_LABEL: 'Absent',
		EMPLOYEE_CARD_PANEL_MORNING_LABEL: 'Matin',
		EMPLOYEE_CARD_PANEL_PRESENT_LABEL: 'Présent(e)',
		EMPLOYEE_CARD_PANEL_EMPLOYEE_HAS_LEAVED_LABEL: 'Parti(e)',
		EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL: "Aujourd'hui",
		EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL_MORNING: 'Ce matin',
		EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_LABEL: "Jusqu'à demain",
		EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_MORNING_LABEL: 'Jusqu’à demain matin',
		EMPLOYEE_CARD_PANEL_UNTIL_DATE_LABEL: "Jusqu'au {{date}} inclus",
		EMPLOYEE_CARD_PANEL_UNTIL_MORNING_DATE_LABEL: "Jusqu'au {{date}} matin",
	},
	de: {
		EMPLOYEE_CARD_PANEL_COMING_ON_LABEL: 'Geplanter Dienstantritt am {{date}}',
		EMPLOYEE_CARD_PANEL_ABSENCE_LABEL: 'Abwesend',
		EMPLOYEE_CARD_PANEL_MORNING_LABEL: 'Vormittag',
		EMPLOYEE_CARD_PANEL_PRESENT_LABEL: 'Anwesend',
		EMPLOYEE_CARD_PANEL_EMPLOYEE_HAS_LEAVED_LABEL: 'Ausgeschieden',
		EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL: 'Bis heute',
		EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL_MORNING: 'heute Vormittag',
		EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_LABEL: 'Bis morgen',
		EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_MORNING_LABEL: 'bis morgen früh',
		EMPLOYEE_CARD_PANEL_UNTIL_DATE_LABEL: 'Bis einschließlich {{date}}',
		EMPLOYEE_CARD_PANEL_UNTIL_MORNING_DATE_LABEL: 'Bis {{date}} morgens',
	},
	es: {
		EMPLOYEE_CARD_PANEL_COMING_ON_LABEL: 'Llegada prevista el {{date}}',
		EMPLOYEE_CARD_PANEL_ABSENCE_LABEL: 'Ausente',
		EMPLOYEE_CARD_PANEL_MORNING_LABEL: 'Por la mañana',
		EMPLOYEE_CARD_PANEL_PRESENT_LABEL: 'Presente',
		EMPLOYEE_CARD_PANEL_EMPLOYEE_HAS_LEAVED_LABEL: 'Se ha marchado',
		EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL: 'Hasta hoy',
		EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL_MORNING: 'esta mañana',
		EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_LABEL: 'Hasta mañana',
		EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_MORNING_LABEL: 'Hasta mañana por la mañana',
		EMPLOYEE_CARD_PANEL_UNTIL_DATE_LABEL: 'Hasta el {{date}} incluido',
		EMPLOYEE_CARD_PANEL_UNTIL_MORNING_DATE_LABEL: 'hasta el {{date}} mañana',
	},
	pt: {
		EMPLOYEE_CARD_PANEL_COMING_ON_LABEL: 'Chegada prevista para {{date}}',
		EMPLOYEE_CARD_PANEL_ABSENCE_LABEL: 'Ausente',
		EMPLOYEE_CARD_PANEL_MORNING_LABEL: 'Manhã',
		EMPLOYEE_CARD_PANEL_PRESENT_LABEL: 'Presente',
		EMPLOYEE_CARD_PANEL_EMPLOYEE_HAS_LEAVED_LABEL: 'Papel',
		EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL: 'Até hoje',
		EMPLOYEE_CARD_PANEL_UNTIL_TODAY_LABEL_MORNING: 'Esta manhã',
		EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_LABEL: 'Até amanhã',
		EMPLOYEE_CARD_PANEL_UNTIL_TOMORROW_MORNING_LABEL: 'Até amanhã de manhã',
		EMPLOYEE_CARD_PANEL_UNTIL_DATE_LABEL: 'Até {{date}} incluído',
		EMPLOYEE_CARD_PANEL_UNTIL_MORNING_DATE_LABEL: 'Até {{date}} de manhã',
	},
};
