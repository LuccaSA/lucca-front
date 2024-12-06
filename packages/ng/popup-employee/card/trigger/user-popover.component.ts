import { OverlayModule } from '@angular/cdk/overlay';
import { Component, effect, inject, input, TemplateRef, viewChild } from '@angular/core';
import { ILuUser, LuUserPictureModule } from '@lucca-front/ng/user';
import { USER_POPOVER_IS_ACTIVATED } from '../../user-popover.providers';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { BehaviorSubject, catchError, combineLatest, Observable, of, switchMap, tap } from 'rxjs';
import { LuUserPopover } from '../../user-popover.model';
import { LuUserPopoverStore } from '../../service/user-popover.store';
import { map } from 'rxjs/operators';
import { getIntl, IntlParamsPipe } from '@lucca-front/ng/core';
import { LU_POPUP_EMPLOYEE_TRANSLATIONS } from '../../popup-employee.translate';
import { AsyncPipe, DatePipe, NgTemplateOutlet } from '@angular/common';
import { IsFutureOrTodayPipe, IsFuturePipe } from '../pipe/is-future.pipe';
import { LeaveEndsDisplayPipe } from '../pipe/leave-ends-display.pipe';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[luUserPopover]',
	templateUrl: './user-popover.component.html',
	styleUrl: './user-popover.component.scss',
	standalone: true,
	exportAs: 'LuUserPopoverDirective',
	hostDirectives: [
		{
			directive: PopoverDirective,
			inputs: ['luPopoverOpenDelay: luUserPopoverEnterDelay', 'luPopoverCloseDelay: luUserPopoverLeaveDelay', 'luPopoverDisabled: luUserPopoverDisabled'],
		},
	],
	imports: [LuUserPictureModule, OverlayModule, AsyncPipe, NgTemplateOutlet, DatePipe, IntlParamsPipe, IsFuturePipe, IsFutureOrTodayPipe, LeaveEndsDisplayPipe],
})
export class LuUserPopoverComponent {
	content = viewChild<TemplateRef<unknown>>('popoverContent');

	luUserPopover = input.required<ILuUser>();

	#popoverRef = inject(PopoverDirective);

	#service = inject(LuUserPopoverStore);

	intl = getIntl(LU_POPUP_EMPLOYEE_TRANSLATIONS);

	#errorImage$ = new BehaviorSubject<boolean>(false);

	public employee$: Observable<LuUserPopover> = toObservable(this.luUserPopover).pipe(
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

	constructor() {
		// Default to disabled to avoid having it flicker or something
		this.#popoverRef.luPopoverDisabled = false;

		// Connect to feature flag
		inject(USER_POPOVER_IS_ACTIVATED)
			.pipe(takeUntilDestroyed())
			.subscribe((isActivated) => {
				this.#popoverRef.luPopoverDisabled = !isActivated;
			});

		this.#popoverRef.customPositions = [
			{ overlayX: 'start', overlayY: 'bottom', originX: 'start', originY: 'top' },
			{ overlayX: 'start', overlayY: 'top', originX: 'start', originY: 'bottom' },
		];

		this.#popoverRef.luPopoverTrigger.set('hover+focus');
		this.#popoverRef.luPopoverNoCloseButton = true;

		effect(() => {
			this.#popoverRef.content = this.content();
		});
	}

	pictureError() {
		this.#errorImage$.next(true);
	}
}
