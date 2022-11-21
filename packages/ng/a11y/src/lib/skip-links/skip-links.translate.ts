import { ILuTranslation } from '@lucca-front/ng/core';

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

export const luSkipLinksTranslations: ILuTranslation<ILuSkipLinksLabel> = {
	en: {
		Goto: 'Quick access',
		Goto_Nav_Banner: 'Go to main navigation',
		Goto_Nav_Navside: 'Go to internal navigation',
		Goto_Content: 'Go to content',
	},
	fr: {
		Goto: 'Accès rapides',
		Goto_Nav_Banner: 'Aller à la navigation principale',
		Goto_Nav_Navside: 'Aller à la navigation interne',
		Goto_Content: 'Aller au contenu',
	},
	es: {
		Goto: 'Acceso rápido',
		Goto_Nav_Banner: 'Ir a la navegación principal',
		Goto_Nav_Navside: 'Ir a la navegación interna',
		Goto_Content: 'Ir al contenido',
	},
};
