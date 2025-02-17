import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_CHIP_TRANSLATIONS = new InjectionToken('luChipTranslations', {
	factory: () => luChipTranslations,
});

export interface ChipTranslate {
	delete: string;
}

export const luChipTranslations: LuTranslation<ChipTranslate> = Translations;
