import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_SKIP_LINKS_TRANSLATIONS = new InjectionToken<LuTranslation<ILuSkipLinksLabel>>('LuModalTranslations', {
	factory: () => luSkipLinksTranslations,
});

export interface ILuSkipLinksLabel {
	Goto: string;
	Goto_Nav_Banner: string;
	Goto_Nav_Navside: string;
	Goto_Content: string;
}
export abstract class ALuSkipLinksLabel {
	Goto: string;
	Goto_Nav_Banner: string;
	Goto_Nav_Navside: string;
	Goto_Content: string;
}

export const luSkipLinksTranslations: LuTranslation<ILuSkipLinksLabel> = Translations;
