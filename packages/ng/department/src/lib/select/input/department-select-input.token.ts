import { InjectionToken } from '@angular/core';
import { ILuTranslation } from 'packages/ng/core/src/lib/translate';
import { ILuDepartmentSelectInputLabel } from './department-select-input.translate';

export const LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS = new InjectionToken<ILuTranslation<ILuDepartmentSelectInputLabel>>('LuDepartmentSelectTranslations');
