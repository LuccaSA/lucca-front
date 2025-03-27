import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_BREADCRUMBS_TRANSLATIONS = new InjectionToken('LuBreadcrumbsTranslations', {
	factory: () => luBreadcrumbsTranslations,
});

export interface LuBreadcrumbsLabel {
	breadcrumbs: string;
}

export const luBreadcrumbsTranslations: LuTranslation<LuBreadcrumbsLabel> = Translations;
