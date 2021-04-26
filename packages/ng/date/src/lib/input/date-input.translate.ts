import { ILuTranslation } from '@lucca-front/ng/core';

export interface ILuDateInputLabel {
	placeholderDay: string;
	placeholderMonth: string;
	placeholderYear: string;
	formatDay: string;
	formatMonth: string;
	formatYear: string;
}
export abstract class ALuDateInputLabel {
	placeholderDay: string;
	placeholderMonth: string;
	placeholderYear: string;
	formatDay: string;
	formatMonth: string;
	formatYear: string;
}

export const luDateInputTranslations = {
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
		placeholder: 'jj/mm/aaaa',
		placeholderDay: 'jj/mm/aaaa',
		placeholderMonth: 'mm/aaaa',
		placeholderYear: 'aaaa',
		formatDay: 'shortDate',
		formatMonth: 'MM/y',
		formatYear: 'y',
	},
} as ILuTranslation<ILuDateInputLabel>;
