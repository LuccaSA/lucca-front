import { Observable, of } from 'rxjs';
import { InjectionToken, makeEnvironmentProviders, Signal } from '@angular/core';
import { ILuUser } from '@lucca-front/ng/user';

export const LU_USER_POPOVER_USER = new InjectionToken<Signal<ILuUser>>('user-popover-user');

/**
 * @deprecated no longer needed as popover is always activated
 */
export const USER_POPOVER_IS_ACTIVATED = new InjectionToken<Observable<boolean>>('user-popover-is-activated', {
	factory: () => of(true),
});

/**
 * @deprecated no longer needed as user popover uses `luPopover2`
 */
export function provideLuUserPopover() {
	return makeEnvironmentProviders([]);
}
