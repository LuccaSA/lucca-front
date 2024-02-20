/* eslint-disable @angular-eslint/no-input-rename */

import { OverlayModule } from '@angular/cdk/overlay';
import { AsyncPipe, DatePipe, NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ALuPopoverPanel, luTransformPopover } from '@lucca-front/ng/popover';
import { ILuUser, LuUserPictureModule } from '@lucca-front/ng/user';
import { Observable, of, Subscription } from 'rxjs';

import { getIntl } from '@lucca-front/ng/core';
import { LU_POPUP_EMPLOYEE_TRANSLATIONS } from '../../popup-employee.translate';
import { LeaveEndsDisplayPipe } from '../pipe/leave-ends-display.pipe';
import { isFutureOrTodayPipe, IsFuturePipe } from '../pipe/is-future.pipe';
import { LuEmployeeCard } from '../../employee.model';
import { ILuEmployeeCardPanel } from './employee-card-panel.model';
import { LuEmployeeCardStore } from '../../service/employee-card.store';
import { ILuEmployeeCardStore } from '../../service/employee-service.model';
import { InjectParameterPipe } from '../pipe/inject-parameter.pipe';
import { catchError } from 'rxjs/operators';

@Component({
	standalone: true,
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'lu-employee-card',
	templateUrl: './employee-card-panel.component.html',
	styleUrls: ['./employee-card-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [luTransformPopover],
	exportAs: 'LuEmployeeCardPanel',
	imports: [ LuUserPictureModule, NgClass, RouterLink, NgIf, NgTemplateOutlet, DatePipe, OverlayModule, LeaveEndsDisplayPipe, AsyncPipe, IsFuturePipe, isFutureOrTodayPipe, InjectParameterPipe ],
})
export class LuEmployeeCardPanelComponent extends ALuPopoverPanel implements ILuEmployeeCardPanel, OnDestroy {
	public employee$: Observable<LuEmployeeCard> | undefined;
	intl = getIntl(LU_POPUP_EMPLOYEE_TRANSLATIONS);
	public get user() {
		return this._user;
	}
	public set user(user) {
		if (user) {
			this._user = user;
			this.employee$ = this._service.get(this._user.id).pipe(
				catchError(() => {
					return of({
						id: this._user.id,
						firstName: this._user.firstName,
						lastName: this._user.lastName,
						leaveEndIsFirstHalfDay: false,
					});
				}),
			);
			this._changeDetectorRef.markForCheck();
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
	protected _user: ILuUser | null = null;

	public constructor(private _changeDetectorRef: ChangeDetectorRef, @Inject(LuEmployeeCardStore) private _service: ILuEmployeeCardStore) {
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
