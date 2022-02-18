import { InjectionToken } from '@angular/core';
import { ILuPopupConfig } from './popup-config.model';
import { ILuPopupRefFactory } from './popup-ref.model';

export const LU_POPUP_REF_FACTORY = new InjectionToken<ILuPopupRefFactory>('LuPopupRefFactory');
/** Injection token that can be used to access the data that was passed in to a dialog. */
export const LU_POPUP_DATA = new InjectionToken<unknown>('LuPopupData');
export const LU_POPUP_CONFIG = new InjectionToken<ILuPopupConfig>('LuPopupDefaultConfig');
