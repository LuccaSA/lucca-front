import { Observable, of } from 'rxjs';
import { inject, InjectionToken} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, shareReplay } from 'rxjs/operators';

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
