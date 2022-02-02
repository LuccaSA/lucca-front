import { InjectionToken } from '@angular/core';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const LU_SIDEPANEL_DATA = new InjectionToken<any>('LuSidepanelData');
export const LU_SIDEPANEL_CONFIG = new InjectionToken<any>('LuSidepanelDefaultConfig');
export const LU_SIDEPANEL_TRANSLATIONS = new InjectionToken('LuSidepanelTranslations');
export const LU_SIDEPANEL_REF_FACTORY = new InjectionToken<any>('LuSidepanelRefFactory');
