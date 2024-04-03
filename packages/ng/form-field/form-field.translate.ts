import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_FORM_FIELD_TRANSLATIONS = new InjectionToken('LuFormFieldTranslations', {
	factory: () => luFormFieldTranslations,
});

export interface LuFormFieldTranslations {
	counter: string;
}

export const luFormFieldTranslations: ILuTranslation<LuFormFieldTranslations> = {
	fr: {
		counter: 'Votre publication fait {{current}} caractères de long. {{max}} caractères maximum sont autorisés.',
	},
	en: {
		counter: 'Your message is {{current}} characters long. A maximum of {{max}} is allowed.',
	},
};
