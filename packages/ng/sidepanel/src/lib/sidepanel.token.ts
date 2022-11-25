import { InjectionToken } from '@angular/core';
import { ILuPopupRefFactory } from '@lucca-front/ng/popup';
import { LuSidepanelConfig } from './sidepanel-config.model';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const LU_SIDEPANEL_DATA = new InjectionToken<unknown>('LuSidepanelData');
export const LU_SIDEPANEL_CONFIG = new InjectionToken<LuSidepanelConfig>('LuSidepanelDefaultConfig');
export const LU_SIDEPANEL_REF_FACTORY = new InjectionToken<ILuPopupRefFactory>('LuSidepanelRefFactory');
