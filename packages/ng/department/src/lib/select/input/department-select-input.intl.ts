import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS } from './department-select-input.token';
import { ILuDepartmentSelectInputLabel } from './department-select-input.translate';
import { ALuIntl } from '@lucca-front/ng/core';

@Injectable()
export class LuDepartmentSelectInputIntl extends ALuIntl<ILuDepartmentSelectInputLabel> {
	constructor(
		@Inject(LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS) translations,
		@Inject(LOCALE_ID) locale,
	) {
		super(translations, locale);
	}
}
