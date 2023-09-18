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
		placeholderDay: 'DD/MM/YYYY',
		placeholderMonth: 'MM/YYYY',
		placeholderYear: 'YYYY',
		formatDay: 'shortDate',
		formatMonth: 'MM/Y',
		formatYear: 'Y',
	},
	'en-GB': {
		placeholderDay: 'DD/MM/YYYY',
		placeholderMonth: 'MM/YYYY',
		placeholderYear: 'YYYY',
		formatDay: 'shortDate',
		formatMonth: 'MM/Y',
		formatYear: 'Y',
	},
	'en-US': {
		placeholderDay: 'MM/DD/YYYY',
		placeholderMonth: 'MM/YYYY',
		placeholderYear: 'YYYY',
		formatDay: 'shortDate',
		formatMonth: 'MM/Y',
		formatYear: 'Y',
	},
	fr: {
		placeholderDay: 'JJ/MM/AAAA',
		placeholderMonth: 'MM/AAAA',
		placeholderYear: 'AAAA',
		formatDay: 'shortDate',
		formatMonth: 'MM/Y',
		formatYear: 'Y',
	},
};
