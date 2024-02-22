import { InjectionToken, Provider } from '@angular/core';

export const LU_CORE_SELECT_CURRENT_USER_ID = new InjectionToken<number>('LuCoreSelectCurrentUserId');

export function provideCoreSelectCurrentUserId(factory: () => number): Provider {
	return {
		provide: LU_CORE_SELECT_CURRENT_USER_ID,
		useFactory: factory,
	};
}
