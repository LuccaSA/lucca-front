import { EnumValue } from '../type';

export enum ELuDateGranularity {
	day = 'day',
	month = 'month',
	year = 'year',
	decade = 'decade',
}

export type LuDateGranularity = EnumValue<ELuDateGranularity>;
