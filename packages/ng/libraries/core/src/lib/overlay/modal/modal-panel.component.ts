import { Component, ViewChild, ComponentRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef,Inject } from '@angular/core';
import { PortalOutlet, CdkPortalOutlet, Portal } from '@angular/cdk/portal';
import { ILuModalContent } from './modal.model';
import { ALuModalRef } from './modal-ref.model';
import { LuModalIntl } from './modal.intl';
import { ILuModalLabel } from './modal.translate'
import { Subject, of } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';


@Component({
	selector: 'lu-modal-panel',
	templateUrl: './modal-panel.component.html',
	styleUrls: ['./modal-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuModalPanelComponent<T extends ILuModalContent = ILuModalContent> implements PortalOutlet, OnDestroy {
	@ViewChild('outlet', { read: CdkPortalOutlet }) protected _outlet: PortalOutlet;
	protected _componentInstance: T;
	get title() {
		return this._componentInstance.title;
	}
	get submitLabel() {
		return this._componentInstance.submitLabel;
	}
	get submitDisabled() {
		return this._componentInstance.submitDisabled;
	}
	submitClass$ = new Subject();
	error$ = new Subject();
	constructor(
		protected _ref: ALuModalRef<LuModalPanelComponent>,
		protected _cdr: ChangeDetectorRef,
		@Inject(LuModalIntl) public intl: ILuModalLabel,
	) {}
	attach<U extends T = T>(portal: Portal<U>) {
		const ref = this._outlet.attach(portal) as ComponentRef<U>;
		this._componentInstance = ref.instance;
		return ref;
	}
	detach() {
		return this._outlet.detach();
	}
	dispose() {
		return this._outlet.dispose();
	}
	hasAttached() {
		return this._outlet.hasAttached();
	}
	ngOnDestroy() {
		this.detach();
		this.dispose();
	}
	dismiss() {
		this._ref.close();
	}
	submit() {
		this.error$.next(undefined);
		this.submitClass$.next('is-loading');
		const action$ = this._componentInstance.submitAction();
		action$.pipe(
			tap(_ => this.submitClass$.next('is-success')),
			tap(() => this._cdr.markForCheck()),
			delay(500),
		)
		.subscribe(result => {
			this._ref.close(result);
		});
		action$.pipe(
			catchError(err => {
				return of(err);
			}),
			tap(err => this.error$.next(err)),
			tap(() => this.submitClass$.next('is-error')),
			tap(() => this._cdr.markForCheck()),
			delay(2000),
			tap(() => this.submitClass$.next('')),
			tap(() => this._cdr.markForCheck()),
		).subscribe(() => {});
	}
}
