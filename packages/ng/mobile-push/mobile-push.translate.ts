import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_MOBILE_PUSH_TRANSLATIONS = new InjectionToken('luMobilePushTranslations', {
	factory: () => luMobilePushTranslations,
});

export interface MobilePushTranslate {
	urlAppStore: string;
	urlGooglePlay: string;
	altAppStore: string;
	altGooglePlay: string;
	srcAppStore: string;
	srcGooglePlay: string;
}

export const luMobilePushTranslations: LuTranslation<MobilePushTranslate> = Translations;
