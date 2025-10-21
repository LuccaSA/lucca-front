import { A11yModule } from '@angular/cdk/a11y';
import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, DoCheck, ElementRef, HostBinding, Injector, OnDestroy, Renderer2, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Observable, ReplaySubject, Subject, Subscription, isObservable, of, timer } from 'rxjs';
import { delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { LuModalClasses } from './modal-config.model';
import { ALuModalRef } from './modal-ref.model';
import { ILuModalContent } from './modal.model';
import { LU_MODAL_TRANSLATIONS } from './modal.translate';

let modalId = 0;

@Directive()
export abstract class ALuModalPanelComponent<T extends ILuModalContent> implements OnDestroy, DoCheck {
	@ViewChild('container', { read: ViewContainerRef, static: true })
	protected _containerRef: ViewContainerRef;
	protected _componentInstance: ILuModalContent;
	protected doCheck$ = new ReplaySubject<void>(1);

	public intl = getIntl(LU_MODAL_TRANSLATIONS);
	protected title$ = this.listenComponentValue(() => this._componentInstance.title);
	protected submitLabel$ = this.listenComponentValue(() => this._componentInstance.submitLabel || this.intl.submit);
	protected cancelLabel$ = this.listenComponentValue(() => this._componentInstance.cancelLabel || this.intl.cancel);
	protected submitCounter$ = this.listenComponentValue(() => this._componentInstance.submitCounter);
	protected submitDisabled$ = this.listenComponentValue(() => this._componentInstance.submitDisabled);
	protected hasSubmitCounter$ = this.submitCounter$.pipe(map(Boolean));

	protected closeLabel = this.intl.close;

	get isSubmitHidden() {
		return !this._componentInstance.submitAction;
	}
	get submitPalette() {
		return this._componentInstance.submitPalette || 'product';
	}

	submitClass$ = new Subject();
	error$ = new Subject();

	public readonly modalId = modalId++;

	private _subs = new Subscription();
	public modalClasses: LuModalClasses;

	constructor(
		protected _ref: ALuModalRef<T>,
		_elementRef: ElementRef<HTMLElement>,
		_renderer: Renderer2,
	) {
		this.modalClasses = _ref.modalClasses;
		_renderer.addClass(_elementRef.nativeElement, this.modalClasses.panel);
	}
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
						delay(500),
					)
					.subscribe({
						next: (result) => this._ref.close(result),
						error: (err) => {
							this.submitClass$.next('is-error');
							this.error$.next(err);
							timer(2000).subscribe((_) => {
								this.submitClass$.next('');
							});
						},
						complete: () => {
							this.submitClass$.next('');
						},
					}),
			);
		} else {
			this._ref.close(result$);
		}
	}

	private listenComponentValue<TValue>(selector: () => TValue | Observable<TValue>): Observable<TValue> {
		return this.doCheck$.pipe(
			map(selector),
			distinctUntilChanged(),
			switchMap((value) => (isObservable(value) ? value : of(value))),
		);
	}
}

const panelImports = [A11yModule, AsyncPipe, LuTooltipModule, NgClass];

@Component({
	selector: 'lu-modal-panel',
	standalone: true,
	imports: panelImports,
	templateUrl: './modal-panel.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuModalPanelComponent<T extends ILuModalContent = ILuModalContent> extends ALuModalPanelComponent<T> {
	@HostBinding('class.lu-modal-panel') class = true;
	constructor(_ref: ALuModalRef<T>, _elementRef: ElementRef<HTMLElement>, _renderer: Renderer2) {
		super(_ref, _elementRef, _renderer);
	}
}
@Component({
	selector: 'lu-modal-panel-default',
	standalone: true,
	imports: panelImports,
	templateUrl: './modal-panel.component.html',
	changeDetection: ChangeDetectionStrategy.Default,
})
export class LuModalPanelComponentDefaultCD<T extends ILuModalContent = ILuModalContent> extends ALuModalPanelComponent<T> {
	@HostBinding('class.lu-modal-panel') class = true;
	constructor(_ref: ALuModalRef<T>, _elementRef: ElementRef<HTMLElement>, _renderer: Renderer2) {
		super(_ref, _elementRef, _renderer);
	}
}
