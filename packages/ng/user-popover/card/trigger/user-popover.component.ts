import { Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, combineLatest, Observable, of, switchMap, tap } from 'rxjs';
import { LuUserPopover } from '../../user-popover.model';
import { LuUserPopoverStore } from '../../service/user-popover.store';
import { map } from 'rxjs/operators';
import { getIntl, IntlParamsPipe } from '@lucca-front/ng/core';
import { LU_POPUP_EMPLOYEE_TRANSLATIONS } from '../../popup-employee.translate';
import { AsyncPipe, DatePipe, NgTemplateOutlet } from '@angular/common';
import { IsFutureOrTodayPipe, IsFuturePipe } from '../pipe/is-future.pipe';
import { LeaveEndsDisplayPipe } from '../pipe/leave-ends-display.pipe';
import { IconComponent } from '@lucca-front/ng/icon';
import { POPOVER_CONFIG } from '@lucca-front/ng/popover2';
import { LU_USER_POPOVER_USER } from '../../user-popover.providers';
import { LoadingComponent } from '@lucca-front/ng/loading';

@Component({
	selector: 'lu-user-popover-content',
	templateUrl: './user-popover.component.html',
	styleUrl: './user-popover.component.scss',
	standalone: true,
	imports: [AsyncPipe, NgTemplateOutlet, DatePipe, IntlParamsPipe, IsFuturePipe, IsFutureOrTodayPipe, LeaveEndsDisplayPipe, IconComponent, LoadingComponent],
})
export class LuUserPopoverComponent {
	luUser = inject(LU_USER_POPOVER_USER);

	#popoverRef = inject(POPOVER_CONFIG).ref;

	#service = inject(LuUserPopoverStore);

	intl = getIntl(LU_POPUP_EMPLOYEE_TRANSLATIONS);

	#errorImage$ = new BehaviorSubject<boolean>(false);

	public employee$: Observable<LuUserPopover> = toObservable(this.luUser).pipe(
		switchMap((user) =>
			this.#service.get(user.id).pipe(
				catchError(() =>
					of({
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						leaveEndIsFirstHalfDay: false,
					}),
				),
			),
		),
		tap(() => this.#popoverRef.updatePosition()),
	);

	public userPictureDisplay$ = combineLatest([this.employee$, this.#errorImage$]).pipe(
		map(([employee, isError]) => {
			if (employee.pictureHref && !isError) {
				return 'img';
			} else {
				return 'initials';
			}
		}),
	);

	public userPictureHref$ = this.employee$.pipe(map((employee) => employee.pictureHref));

	public userInitials$ = this.employee$.pipe(
		map((employee) => {
			const initials = `${employee.firstName[0]}${employee.lastName[0]}`;

			return {
				initials,
				color: `${employee.firstName} ${employee.lastName}`.split('').reduce((sum, a) => sum + a.charCodeAt(0), 0) % 360,
			};
		}),
	);

	pictureError() {
		this.#errorImage$.next(true);
	}
}
