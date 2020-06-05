import { InjectionToken } from '@angular/core';

export interface ILuStringDateAdapterOptions {
	useUtc?: boolean;
	timezone?: 'none' | 'gmt' | 'z',
}
export const luDefaultStringDateAdapterOptions: ILuStringDateAdapterOptions = {
	useUtc: false,
	timezone: 'gmt',
};
export const LU_STRING_DATE_ADAPTER_OPTIONS = new InjectionToken<ILuStringDateAdapterOptions>('String date adapter options');
