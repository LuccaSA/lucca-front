import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_IMPERSONATION_TRANSLATIONS = new InjectionToken('LuImpersonationTranslations', {
	factory: () => luImpersonationTranslations,
});

export interface LuImpersonationTranslations {
	a11yNavigationDescription: string;
	switchProfile: string;
	clear: string;
}

export const luImpersonationTranslations: LuTranslation<LuImpersonationTranslations> = Translations;
