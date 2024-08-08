import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS = new InjectionToken('LuDepartmentSelectTranslations', {
	factory: () => luDepartmentSelectInputTranslations,
});

export interface ILuDepartmentSelectInputLabel {
	departments: string;
}

export const luDepartmentSelectInputTranslations: LuTranslation<ILuDepartmentSelectInputLabel> = Translations;
