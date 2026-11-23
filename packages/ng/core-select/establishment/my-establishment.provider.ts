import { InjectionToken, Provider } from '@angular/core';

// TODO v24: make it mandatory, like `LU_CORE_SELECT_CURRENT_USER_ID`. Until then it is injected as optional
// and the "My establishment" option is not displayed when the app does not provide it.
export const LU_CORE_SELECT_CURRENT_ESTABLISHMENT_ID = new InjectionToken<number>('LuCoreSelectCurrentEstablishmentId');

/**
 * Provide the establishment of the current user, displayed as "My establishment" by the `establishments` selects
 * that set `displayMyEstablishmentOption`.
 */
export function provideCoreSelectCurrentEstablishmentId(factory: () => number): Provider {
	return {
		provide: LU_CORE_SELECT_CURRENT_ESTABLISHMENT_ID,
		useFactory: factory,
	};
}
