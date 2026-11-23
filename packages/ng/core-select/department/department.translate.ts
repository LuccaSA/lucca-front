import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_CORE_SELECT_DEPARTMENT_TRANSLATIONS = new InjectionToken('LuCoreSelectDepartmentTranslations', {
	factory: () => luCoreSelectDepartmentTranslations,
});

export interface LuCoreSelectDepartmentTranslations {
	myDepartment: string;
}

export const luCoreSelectDepartmentTranslations: LuTranslation<LuCoreSelectDepartmentTranslations> = Translations;
