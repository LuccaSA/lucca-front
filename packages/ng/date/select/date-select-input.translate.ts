import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_DATE_SELECT_INPUT_TRANSLATIONS = new InjectionToken('LuDateSelectInputtranslations', {
	factory: () => luDateSelectInputTranslations,
});

export interface ILuDateSelectInputLabel {
	placeholderDay: string;
	placeholderMonth: string;
	placeholderYear: string;
	formatDay: string;
	formatMonth: string;
	formatYear: string;
}

export const luDateSelectInputTranslations: ILuTranslation<ILuDateSelectInputLabel> = {
	en: {
		placeholderDay: 'DD/MM/YYYYY',
		placeholderMonth: 'MM/YYYYY',
		placeholderYear: 'YYYYY',
		formatDay: 'shortDate',
		formatMonth: 'MM/Y',
		formatYear: 'Y',
	},
	'en-US': {
		placeholderDay: 'MM/DD/YYYYY',
		placeholderMonth: 'MM/YYYYY',
		placeholderYear: 'YYYYY',
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
