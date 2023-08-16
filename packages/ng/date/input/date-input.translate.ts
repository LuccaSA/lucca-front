import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_DATE_INPUT_TRANSLATIONS = new InjectionToken('LuDateInputtranslations', {
	factory: () => luDateInputTranslations,
});

export interface ILuDateInputLabel {
	placeholderDay: string;
	placeholderMonth: string;
	placeholderYear: string;
	formatDay: string;
	formatMonth: string;
	formatYear: string;
}

export const luDateInputTranslations: ILuTranslation<ILuDateInputLabel> = {
	en: {
		placeholderDay: 'dd/mm/yyyy',
		placeholderMonth: 'mm/yyyy',
		placeholderYear: 'yyyy',
		formatDay: 'shortDate',
		formatMonth: 'MM/y',
		formatYear: 'y',
	},
	'en-GB': {
		placeholderDay: 'dd/mm/yyyy',
		placeholderMonth: 'mm/yyyy',
		placeholderYear: 'yyyy',
		formatDay: 'shortDate',
		formatMonth: 'MM/y',
		formatYear: 'y',
	},
	'en-US': {
		placeholderDay: 'mm/dd/yyyy',
		placeholderMonth: 'mm/yyyy',
		placeholderYear: 'yyyy',
		formatDay: 'shortDate',
		formatMonth: 'MM/y',
		formatYear: 'y',
	},
	fr: {
		placeholderDay: 'jj/mm/aaaa',
		placeholderMonth: 'mm/aaaa',
		placeholderYear: 'aaaa',
		formatDay: 'shortDate',
		formatMonth: 'MM/y',
		formatYear: 'y',
	},
};