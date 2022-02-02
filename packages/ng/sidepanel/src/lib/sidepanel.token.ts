import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { ILuSidepanelConfig } from './sidepanel-config.model';
import { LuSidepanelRefFactory } from './sidepanel-ref.factory';
import { ILuSidepanelLabel } from './sidepanel.translate';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const LU_SIDEPANEL_DATA = new InjectionToken<unknown>('LuSidepanelData');
export const LU_SIDEPANEL_CONFIG = new InjectionToken<ILuSidepanelConfig>('LuSidepanelDefaultConfig');
export const LU_SIDEPANEL_TRANSLATIONS = new InjectionToken<ILuTranslation<ILuSidepanelLabel>>('LuSidepanelTranslations');
export const LU_SIDEPANEL_REF_FACTORY = new InjectionToken<LuSidepanelRefFactory>('LuSidepanelRefFactory');
