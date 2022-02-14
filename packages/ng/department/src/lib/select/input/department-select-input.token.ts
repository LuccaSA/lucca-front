import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';
import { ILuDepartmentSelectInputLabel } from './department-select-input.translate';

export const LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS = new InjectionToken<ILuTranslation<ILuDepartmentSelectInputLabel>>('LuDepartmentSelectTranslations');
