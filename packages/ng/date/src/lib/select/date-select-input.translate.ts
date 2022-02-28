import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuDateSelectInputLabel {
	placeholderDay: string;
	placeholderMonth: string;
	placeholderYear: string;
	formatDay: string;
	formatMonth: string;
	formatYear: string;
}
export abstract class ALuDateSelectInputLabel {
	placeholderDay: string;
	placeholderMonth: string;
	placeholderYear: string;
	formatDay: string;
	formatMonth: string;
	formatYear: string;
}

export const luDateSelectInputTranslations: ILuTranslation<ILuDateSelectInputLabel> = {
	en: {
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
