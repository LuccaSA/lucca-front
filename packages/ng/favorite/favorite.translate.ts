import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_FAVORITE_TRANSLATIONS = new InjectionToken('LuFavoriteTranslations', {
	factory: () => luFavoriteTranslations,
});

export interface LuFavoriteTranslations {
	label: string;
	add: string;
	remove: string;
}

export const luFavoriteTranslations: LuTranslation<LuFavoriteTranslations> = Translations;
