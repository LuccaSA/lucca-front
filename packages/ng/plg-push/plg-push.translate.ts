import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_PLG_PUSH_TRANSLATIONS = new InjectionToken('LuPlgPushTranslations', {
	factory: () => LuPlgPushTranslations,
});

export interface LuPlgPushLabel {
	close: string;
}

export const LuPlgPushTranslations: LuTranslation<LuPlgPushLabel> = Translations;
