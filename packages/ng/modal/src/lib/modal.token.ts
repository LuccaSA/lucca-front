import { InjectionToken } from '@angular/core';
import { ILuPopupRefFactory } from '@lucca-front/ng/popup';
import { ILuModalConfig } from './modal-config.model';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const LU_MODAL_DATA = new InjectionToken<unknown>('LuModalData');
export const LU_MODAL_CONFIG = new InjectionToken<ILuModalConfig>('LuModalDefaultConfig');
export const LU_MODAL_REF_FACTORY = new InjectionToken<ILuPopupRefFactory>('LuModalRefFactory');
