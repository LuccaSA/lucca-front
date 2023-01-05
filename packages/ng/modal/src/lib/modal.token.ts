import { inject, InjectionToken } from '@angular/core';
import { ILuPopupRefFactory, LU_POPUP_CONFIG } from '@lucca-front/ng/popup';
import { ILuModalConfig } from './modal-config.model';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const LU_MODAL_DATA = new InjectionToken<unknown>('LuModalData');
export const LU_MODAL_CONFIG = new InjectionToken<ILuModalConfig>('LuModalDefaultConfig', {
	factory: () => inject(LU_POPUP_CONFIG),
});
export const LU_MODAL_REF_FACTORY = new InjectionToken<ILuPopupRefFactory>('LuModalRefFactory', {
	factory: () => ({
		forge() {
			throw new Error('[LuModalRefFactory] Cannot call forge, LuModalRefFactory needs to be overriden.');
		},
	}),
});
