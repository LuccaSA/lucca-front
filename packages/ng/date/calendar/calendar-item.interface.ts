import { ELuDateGranularity } from '@lucca-front/ng/core';

export interface ICalendarItem<D> {
	id: string;
	date: D;
	mods: string[];
	label: string;
	isDisabled: boolean;
	granularity: ELuDateGranularity;
}
