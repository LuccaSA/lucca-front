import { Observable, of } from 'rxjs';
import { importProvidersFrom, inject, InjectionToken, makeEnvironmentProviders, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { OverlayModule } from '@angular/cdk/overlay';
import { ILuUser } from '../user/user.model';

export const LU_USER_POPOVER_USER = new InjectionToken<Signal<ILuUser>>('user-popover-user');

export const USER_POPOVER_IS_ACTIVATED = new InjectionToken<Observable<boolean>>('user-popover-is-activated', {
	factory: () =>
		inject(HttpClient)
			.get<{ key: string; status: string }>('/lucca-banner/meta/api/feature-flag-statuses/user-popover-is-activated')
			.pipe(
				map((flag) => flag.status === 'Enabled'),
				catchError(() => of(false)),
				shareReplay(1),
			),
});

export function provideLuUserPopover() {
	return makeEnvironmentProviders([importProvidersFrom(OverlayModule)]);
}
