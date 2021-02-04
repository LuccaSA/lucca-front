import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { ILuOptionSelectAllLabel } from '@lucca-front/ng/option';
import { LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS } from './establishment-select-input.token';
import { ILuEstablishmentSelectInputLabel } from './establishment-select-input.translate';

export const luEstablishmentSelectAllTranslations = {
	en: {
		select: 'Select all establishments',
		deselect: 'Deselect all establishments',
	},
	fr: {
		select: 'Sélectionner tous les établissements',
		deselect: 'Déselectionner tous les établissements'
	}
} as ILuTranslation<ILuOptionSelectAllLabel>;

@Injectable()
export class LuEstablishmentSelectInputIntl extends ALuIntl<ILuEstablishmentSelectInputLabel> {
	constructor(@Inject(LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS) translations, @Inject(LOCALE_ID) locale) {
		super(translations, locale);
	}
}
