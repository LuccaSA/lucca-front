import { Component, ViewChild, ComponentRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Directive } from '@angular/core';
import { PortalOutlet, CdkPortalOutlet, Portal } from '@angular/cdk/portal';
import { ILuModalContent } from './modal.model';
import { ALuModalRef } from './modal-ref.model';
import { LuModalIntl } from './modal.intl';
import { ILuModalLabel } from './modal.translate';
import { Subject, timer, Observable, Subscription } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { LU_MODAL_TRANSLATIONS } from './modal.token';

@Directive()
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
	get isSubmitDisabled() {
		return this._componentInstance.submitDisabled;
	}
	get isSubmitHidden() {
		return !this._componentInstance.submitAction;
	}
	get submitPalette() {
		return this._componentInstance.submitPalette || 'primary';
	}
	get hasSubmitCounter() {
		return !!this._componentInstance.submitCounter;
	}
	get submitCounter() {
		return this._componentInstance.submitCounter || 0;
	}
	
	submitClass$ = new Subject();
	error$ = new Subject();

	private _subs = new Subscription();

	constructor(
		protected _ref: ALuModalRef<LuModalPanelComponent>,
		protected _cdr: ChangeDetectorRef,
		@Inject(LU_MODAL_TRANSLATIONS) public intl: ILuModalLabel,
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
		this._subs.unsubscribe();
		this.detach();
		this.dispose();
	}
	dismiss() {
		this._ref.dismiss();
	}
	submit() {
		this.error$.next(undefined);
		this.submitClass$.next('is-loading');
		const result$ = this._componentInstance.submitAction();
		if (result$ instanceof Observable) {
			this._subs.add(result$.pipe(
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
			}));
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
	host: {'class': 'lu-modal-panel'},
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
@Component({
	selector: 'lu-modal-panel-default',
	templateUrl: './modal-panel.component.html',
	styleUrls: ['./modal-panel.component.scss'],
	host: {'class': 'lu-modal-panel'},
	changeDetection: ChangeDetectionStrategy.Default,
})
export class LuModalPanelComponentDefaultCD<T extends ILuModalContent = ILuModalContent> extends ALuModalPanelComponent<T> {
	constructor(
		_ref: ALuModalRef<LuModalPanelComponent>,
		_cdr: ChangeDetectorRef,
		@Inject(LuModalIntl) intl: ILuModalLabel,
	) {
		super(_ref, _cdr, intl);
	}
}
