import { Component, ViewChild, ComponentRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { PortalOutlet, CdkPortalOutlet, Portal } from '@angular/cdk/portal';
import { ILuModalContent } from './modal.model';
import { ALuModalRef } from './modal-ref.model';
import { LuModalIntl } from './modal.intl';
import { ILuModalLabel } from './modal.translate'
import { Subject, timer, Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

export abstract class ALuModalPanelComponent<T extends ILuModalContent = ILuModalContent> implements PortalOutlet, OnDestroy {
	@ViewChild('outlet', { read: CdkPortalOutlet, static: true }) protected _outlet: PortalOutlet;
	protected _componentInstance: T;
	get title() {
		return this._componentInstance.title;
	}
	get submitLabel() {
		return this._componentInstance.submitLabel || this.intl.submit;
	}
	get cancelLabel() {
		return this._componentInstance.cancelLabel || this.intl.cancel;
	}
	get submitDisabled() {
		return this._componentInstance.submitDisabled;
	}
	get submitHidden() {
		return !this._componentInstance.submitAction;
	}
	submitClass$ = new Subject();
	dismissClass$ = new Subject();
	error$ = new Subject();
	constructor(
		protected _ref: ALuModalRef<LuModalPanelComponent>,
		protected _cdr: ChangeDetectorRef,
		public intl: ILuModalLabel,
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
		if (!this._componentInstance.cancelAction) {
			return this._ref.close();
		}
		const result$ = this._componentInstance.cancelAction();
		if (result$ instanceof Observable) {
			this.dismissClass$.next('is-loading');
			result$.subscribe(
				result => this._ref.close(result),
				err => this._ref.close(err),
			);
		} else {
			const result = result$;
			this._ref.close(result);
		}
	}
	submit() {
		this.error$.next(undefined);
		const result$ = this._componentInstance.submitAction();
		if (result$ instanceof Observable) {
			this.submitClass$.next('is-loading');
			result$.pipe(
				tap(_ => this.submitClass$.next('is-success')),
				tap(() => this._cdr.markForCheck()),
				delay(500),
			)
			.subscribe(result => {
				this._ref.close(result);
			}, err => {
				this.submitClass$.next('is-error');
				this.error$.next(err);
				this._cdr.markForCheck();
				timer(2000).subscribe(_ => {
					this.submitClass$.next('');
					this._cdr.markForCheck();
				});
			});
		} else {
			const result = result$;
			this._ref.close(result);
		}

	}
}

@Component({
	selector: 'lu-modal-panel',
	templateUrl: './modal-panel.component.html',
	styleUrls: ['./modal-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuModalPanelComponent<T extends ILuModalContent = ILuModalContent> extends ALuModalPanelComponent<T> {
	constructor(
		_ref: ALuModalRef<LuModalPanelComponent>,
		_cdr: ChangeDetectorRef,
		@Inject(LuModalIntl) intl: ILuModalLabel,
	) {
		super(_ref, _cdr, intl);
	}
}
