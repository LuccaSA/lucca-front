import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_READMORE_TRANSLATIONS = new InjectionToken('luReadMoreTranslations', {
	factory: () => luReadMoreTranslations,
});

export interface ReadMoreTranslate {
	readMore: string;
	readLess: string;
}

export const luReadMoreTranslations: LuTranslation<ReadMoreTranslate> = Translations;
