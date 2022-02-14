import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuIntl, ILuTranslation } from '@lucca-front/ng/core';
import { LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS } from './department-select-input.token';
import { ILuDepartmentSelectInputLabel } from './department-select-input.translate';

@Injectable()
export class LuDepartmentSelectInputIntl extends ALuIntl<ILuDepartmentSelectInputLabel> {
	constructor(
		@Inject(LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS)
		translations: ILuTranslation<ILuDepartmentSelectInputLabel>,
		@Inject(LOCALE_ID) locale: string,
	) {
		super(translations, locale);
	}
}
