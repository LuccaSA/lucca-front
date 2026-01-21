import { AsyncPipe, DatePipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { intlInputOptions, IntlParamsPipe } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { POPOVER_CONFIG } from '@lucca-front/ng/popover2';
import { BehaviorSubject, catchError, combineLatest, Observable, of, switchMap, tap } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LU_POPUP_EMPLOYEE_TRANSLATIONS } from '../../popup-employee.translate';
import { LuUserPopoverStore } from '../../service/user-popover.store';
import { LuUserPopover } from '../../user-popover.model';
import { LU_USER_POPOVER_USER } from '../../user-popover.providers';
import { IsFutureOrTodayPipe, IsFuturePipe } from '../pipe/is-future.pipe';
import { LeaveEndsDisplayPipe } from '../pipe/leave-ends-display.pipe';

@Component({
	selector: 'lu-user-popover-content',
	templateUrl: './user-popover.component.html',
	styleUrl: './user-popover.component.scss',
	imports: [AsyncPipe, NgTemplateOutlet, DatePipe, IntlParamsPipe, IsFuturePipe, IsFutureOrTodayPipe, LeaveEndsDisplayPipe, IconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuUserPopoverComponent {
	luUser = inject(LU_USER_POPOVER_USER);

	#popoverRef = inject(POPOVER_CONFIG).ref;

	#service = inject(LuUserPopoverStore);

	intl = input(...intlInputOptions(LU_POPUP_EMPLOYEE_TRANSLATIONS));

	#errorImage$ = new BehaviorSubject<boolean>(false);

	skeletonWidths = [this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent(), this.getRandomPercent()];

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
		shareReplay(1),
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

	getRandomPercent(min: number = 33, max: number = 66): string {
		return `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
	}
}
