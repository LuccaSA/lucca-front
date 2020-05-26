import { InjectionToken } from '@angular/core';

export interface ILuNativeDateAdapterOptions {
	useUtc?: boolean;
}
export const luDefaultNativeDateAdapterOptions: ILuNativeDateAdapterOptions = {
	useUtc: false,
};
export const LU_NATIVE_DATE_ADAPTER_OPTIONS = new InjectionToken<ILuNativeDateAdapterOptions>('Native date adapter options');
