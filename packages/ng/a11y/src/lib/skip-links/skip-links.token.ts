import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { ILuSkipLinksLabel, luSkipLinksTranslations } from './skip-links.translate';

export const LU_SKIP_LINKS_TRANSLATIONS = new InjectionToken<ILuTranslation<ILuSkipLinksLabel>>('LuModalTranslations', {
	factory: () => luSkipLinksTranslations,
});
