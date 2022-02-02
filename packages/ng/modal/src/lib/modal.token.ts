import { InjectionToken } from '@angular/core';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const LU_MODAL_DATA = new InjectionToken<any>('LuModalData');
export const LU_MODAL_CONFIG = new InjectionToken<any>('LuModalDefaultConfig');
export const LU_MODAL_REF_FACTORY = new InjectionToken<any>(
	'LuModalRefFactory',
);
export const LU_MODAL_TRANSLATIONS = new InjectionToken('LuModalTranslations');
