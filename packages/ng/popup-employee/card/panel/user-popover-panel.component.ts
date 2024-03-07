/* eslint-disable @angular-eslint/no-input-rename */

import { OverlayModule } from '@angular/cdk/overlay';
import { AsyncPipe, DatePipe, NgClass, NgIf, NgOptimizedImage, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Inject,
	Input,
	OnDestroy,
	Output,
	TemplateRef,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ALuPopoverPanel, luTransformPopover } from '@lucca-front/ng/popover';
import { ILuUser, LuUserPictureModule } from '@lucca-front/ng/user';
import { BehaviorSubject, combineLatest, concatMap, Observable, of, ReplaySubject, Subscription } from 'rxjs';

import { getIntl } from '@lucca-front/ng/core';
import { LuUserPopover } from '../../user-popover.model';
import { LU_POPUP_EMPLOYEE_TRANSLATIONS } from '../../popup-employee.translate';
import { LuUserPopoverStore } from '../../service/user-popover.store';
import { ILuUserPopoverStore } from '../../service/user-popover-service.model';
import { InjectParameterPipe } from '../pipe/inject-parameter.pipe';
import { isFutureOrTodayPipe, IsFuturePipe } from '../pipe/is-future.pipe';
import { LeaveEndsDisplayPipe } from '../pipe/leave-ends-display.pipe';
import { ILuUserPopoverPanel } from './user-popover-panel.model';
import { catchError, map } from 'rxjs/operators';

@Component({
	standalone: true,
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'lu-user-popover-panel',
	templateUrl: './user-popover-panel.component.html',
	styleUrls: ['./user-popover-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	animations: [luTransformPopover],
	exportAs: 'LuUserPopoverPanel',
	imports: [
		LuUserPictureModule,
		NgClass,
		RouterLink,
		NgIf,
		NgTemplateOutlet,
		DatePipe,
		OverlayModule,
		LeaveEndsDisplayPipe,
		AsyncPipe,
		IsFuturePipe,
		isFutureOrTodayPipe,
		InjectParameterPipe,
		NgSwitch,
		NgSwitchCase,
		NgOptimizedImage,
	],
})
export class LuUserPopoverPanelComponent extends ALuPopoverPanel implements ILuUserPopoverPanel, OnDestroy {
	#user$ = new ReplaySubject<ILuUser>();
	#errorImage$ = new BehaviorSubject<boolean>(false);
	public employee$: Observable<LuUserPopover> = this.#user$.pipe(
		concatMap((user) =>
			this._service.get(user.id).pipe(
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

	pictureError() {
		this.#errorImage$.next(true);
	}

	public userPictureHref$ = this.employee$.pipe(map((employee) => employee.pictureHref));

	public userInitials$ = this.employee$.pipe(
		// TODO: verifier s'il y a besoin de créer un lien avec la locale
		map((employee) => {
			const initials = `${employee.firstName[0]}${employee.lastName[0]}`;

			return {
				initials,
				color: `${employee.firstName}${employee.lastName}`.split('').reduce((sum, a) => sum + a.charCodeAt(0), 0) % 360,
			};
		}),
	);

	intl = getIntl(LU_POPUP_EMPLOYEE_TRANSLATIONS);

	public set user(user: ILuUser) {
		if (user) {
			this.#user$.next(user);
		}
	}

	/**
	 * This method takes classes set on the host lu-popover element and applies them on the
	 * popover template that displays in the overlay container.  Otherwise, it's difficult
	 * to style the containing popover from outside the component.
	 * @param classes list of class names
	 */
	@Input('panel-classes')
	public set inputPanelClasses(classes: string) {
		this.panelClasses = classes;
	}
	/**
	 * This method takes classes set on the host lu-popover element and applies them on the
	 * popover template that displays in the overlay container. Otherwise, it's difficult
	 * to style the containing popover from outside the component.
	 * @param classes list of class names
	 */
	@Input('content-classes')
	public set inputContentClasses(classes: string) {
		this.contentClasses = classes;
	}

	/** Event emitted when the popover is closed. */
	// eslint-disable-next-line @angular-eslint/no-output-native
	@Output() public override close = new EventEmitter<void>();
	// eslint-disable-next-line @angular-eslint/no-output-native
	@Output() public override open = new EventEmitter<void>();
	@Output() public override hovered = new EventEmitter<boolean>();

	@ViewChild(TemplateRef, { static: true })
	public set vcTemplateRef(tr: TemplateRef<unknown>) {
		this.templateRef = tr;
	}

	private _subs = new Subscription();

	public constructor(private _changeDetectorRef: ChangeDetectorRef, @Inject(LuUserPopoverStore) private _service: ILuUserPopoverStore) {
		super();
	}

	public ngOnDestroy() {
		this.onClose();
		this.close.complete();
		this._subs.unsubscribe();
	}

	public _emitCloseEvent(): void {
		this.close.emit();
	}

	public _emitOpenEvent(): void {
		this.open.emit();
	}

	public _emitHoveredEvent(hovered: boolean): void {
		this.hovered.emit(hovered);
	}

	public override onOpen() {
		this.focusFirstItem();
	}

	private focusFirstItem() {
		// const firstItem = this._items[0];
		// if (firstItem) {
		//   firstItem.focus();
		// }
	}


}
