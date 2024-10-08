import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_POPOVER2_TRANSLATIONS = new InjectionToken('LuPopover2Translations', {
	factory: () => luPopoverTranslations,
});

export interface ILuPopover2Label {
	close: string;
}

export const luPopoverTranslations: LuTranslation<ILuPopover2Label> = Translations;
