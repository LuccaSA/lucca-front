import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_LINK_TRANSLATIONS = new InjectionToken('luLinkTranslations', {
	factory: () => luLinkTranslations,
});

export interface LinkTranslate {
	external: string;
}

export const luLinkTranslations: LuTranslation<LinkTranslate> = Translations;
