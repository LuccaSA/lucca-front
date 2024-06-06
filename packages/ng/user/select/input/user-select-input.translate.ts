import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_USER_SELECT_INPUT_TRANSLATIONS = new InjectionToken('LuUserSelectTranslations', {
	factory: () => luUserSelectInputTranslations,
});

export interface ILuUserSelectInputLabel {
	users: string;
	me: string;
}

export const luUserSelectInputTranslations: ILuTranslation<ILuUserSelectInputLabel> = {
	en: {
		users: 'users',
		me: 'Me:',
	},
	fr: {
		users: 'utilisateurs',
		me: 'Moi :',
	},
	es: {
		users: 'empleados',
		me: 'Yo :',
	},
	de: {
		users: 'Benutzer',
		me: 'Ich:',
	},
};
