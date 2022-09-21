import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, DoCheck, HostBinding, Inject, Injector, OnDestroy, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, of, ReplaySubject, Subject, Subscription, timer } from 'rxjs';
import { delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { ALuModalRef } from './modal-ref.model';
import { LuModalIntl } from './modal.intl';
import { ILuModalContent } from './modal.model';
import { LU_MODAL_TRANSLATIONS } from './modal.token';
import { ILuModalLabel } from './modal.translate';

@Directive()
export abstract class ALuModalPanelComponent<T extends ILuModalContent> implements OnDestroy, DoCheck {
	@ViewChild('container', { read: ViewContainerRef, static: true })
	protected _containerRef: ViewContainerRef;
	protected _componentInstance: ILuModalContent;
	protected doCheck$ = new ReplaySubject<void>(1);

	protected title$ = this.listenComponentValue(() => this._componentInstance.title);
	protected submitLabel$ = this.listenComponentValue(() => this._componentInstance.submitLabel || this.intl.submit);
	protected cancelLabel$ = this.listenComponentValue(() => this._componentInstance.cancelLabel || this.intl.cancel);

	protected closeLabel = this.intl.close;

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

	constructor(protected _ref: ALuModalRef<T>, protected _cdr: ChangeDetectorRef, @Inject(LU_MODAL_TRANSLATIONS) public intl: ILuModalLabel) {}
	ngDoCheck(): void {
		this.doCheck$.next();
	}
	attachInnerComponent(componentType: Type<T>, injector: Injector) {
		const ref = this._containerRef.createComponent(componentType, { injector });
		this._componentInstance = ref.instance;
		return ref;
	}
	ngOnDestroy() {
		this.doCheck$.complete();
		this._subs.unsubscribe();
	}
	dismiss() {
		this._ref.dismiss();
	}
	submit() {
		this.error$.next(undefined);
		this.submitClass$.next('is-loading');
		const result$ = this._componentInstance.submitAction();
		if (result$ instanceof Observable) {
			this._subs.add(
				result$
					.pipe(
						tap((_) => this.submitClass$.next('is-success')),
						tap(() => this._cdr.markForCheck()),
						delay(500),
					)
					.subscribe({
						next: (result) => this._ref.close(result),
						error: (err) => {
							this.submitClass$.next('is-error');
							this.error$.next(err);
							this._cdr.markForCheck();
							timer(2000).subscribe((_) => {
								this.submitClass$.next('');
								this._cdr.markForCheck();
							});
						},
					}),
			);
		} else {
			const result = result$;
			this._ref.close(result);
		}
	}

	private listenComponentValue(selector: () => string | Observable<string>): Observable<string> {
		return this.doCheck$.pipe(
			map(selector),
			distinctUntilChanged(),
			switchMap((value) => (typeof value === 'string' ? of(value) : value)),
		);
	}
}

@Component({
	selector: 'lu-modal-panel',
	templateUrl: './modal-panel.component.html',
	styleUrls: ['./modal-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuModalPanelComponent<T extends ILuModalContent = ILuModalContent> extends ALuModalPanelComponent<T> {
	@HostBinding('class.lu-modal-panel') class = true;
	constructor(_ref: ALuModalRef<T>, _cdr: ChangeDetectorRef, @Inject(LuModalIntl) intl: ILuModalLabel) {
		super(_ref, _cdr, intl);
	}
}
@Component({
	selector: 'lu-modal-panel-default',
	templateUrl: './modal-panel.component.html',
	styleUrls: ['./modal-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LuModalPanelComponentDefaultCD<T extends ILuModalContent = ILuModalContent> extends ALuModalPanelComponent<T> {
	@HostBinding('class.lu-modal-panel') class = true;
	constructor(_ref: ALuModalRef<T>, _cdr: ChangeDetectorRef, @Inject(LuModalIntl) intl: ILuModalLabel) {
		super(_ref, _cdr, intl);
	}
}
