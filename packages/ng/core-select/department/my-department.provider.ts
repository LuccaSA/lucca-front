import { InjectionToken, Provider } from '@angular/core';

// TODO v24: make it mandatory, like `LU_CORE_SELECT_CURRENT_USER_ID`. Until then it is injected as optional
// and the "My department" option is not displayed when the app does not provide it.
export const LU_CORE_SELECT_CURRENT_DEPARTMENT_ID = new InjectionToken<number>('LuCoreSelectCurrentDepartmentId');

/**
 * Provide the department of the current user, displayed as "My department" by the `departments` selects
 * that set `displayMyDepartmentOption`.
 */
export function provideCoreSelectCurrentDepartmentId(factory: () => number): Provider {
	return {
		provide: LU_CORE_SELECT_CURRENT_DEPARTMENT_ID,
		useFactory: factory,
	};
}
