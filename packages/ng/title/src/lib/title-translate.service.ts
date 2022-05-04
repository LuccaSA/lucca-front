import { InjectionToken } from '@angular/core';

export const LU_TITLE_TRANSLATE_SERVICE = new InjectionToken<ILuTitleTranslateService>('TITLE_TRANSLATE_SERVICE');

export interface ILuTitleTranslateService {
	translate(key: string, args?: { [arg: string]: unknown }): string;
}
