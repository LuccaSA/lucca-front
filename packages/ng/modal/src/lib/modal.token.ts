import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { ILuPopupRefFactory } from '@lucca-front/ng/popup';
import { ILuModalConfig, ILuModalLabel } from '.';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const LU_MODAL_DATA = new InjectionToken<unknown>('LuModalData');
export const LU_MODAL_CONFIG = new InjectionToken<ILuModalConfig>('LuModalDefaultConfig');
export const LU_MODAL_REF_FACTORY = new InjectionToken<ILuPopupRefFactory>('LuModalRefFactory');
export const LU_MODAL_TRANSLATIONS = new InjectionToken<ILuTranslation<ILuModalLabel>>('LuModalTranslations');
