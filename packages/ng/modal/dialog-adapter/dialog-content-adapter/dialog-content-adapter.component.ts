import { ChangeDetectionStrategy, Component, DestroyRef, DoCheck, inject, Injector, OnInit, signal, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { DialogComponent, DialogContentComponent, DialogFooterComponent, DialogHeaderComponent, injectDialogData, injectDialogRef } from '@lucca-front/ng/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { ILuModalContent, LuModalContentResult } from '../../modal.model';
import { ALuModalRef } from '../../modal-ref.model';
import { LU_MODAL_DATA } from '../../modal.token';
import { delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { isObservable, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { getIntl, Palette } from '@lucca-front/ng/core';
import { LU_MODAL_TRANSLATIONS } from '../../modal.translate';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@lucca-front/ng/button';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';

interface AdapterData<D, C> {
	component: ComponentType<C>;
	data: D;
}

@Component({
	selector: 'lu-dialog-content-adapter',
	standalone: true,
	templateUrl: './dialog-content-adapter.component.html',
	changeDetection: ChangeDetectionStrategy.Default,
	encapsulation: ViewEncapsulation.None,
	imports: [DialogComponent, DialogHeaderComponent, DialogContentComponent, DialogFooterComponent, AsyncPipe, ButtonComponent, NgIf, NumericBadgeComponent, NgClass],
})
export class DialogContentAdapterComponent<D, C extends ILuModalContent> implements OnInit, DoCheck {
	#destroyRef = inject(DestroyRef);

	@ViewChild('contentProjectionRef', { read: ViewContainerRef, static: true })
	contentProjectionRef: ViewContainerRef;

	#contentComponentInstance: C;

	#injector = inject(Injector);

	dialogData = injectDialogData<AdapterData<D, C>>();

	ref = injectDialogRef<LuModalContentResult<C>>();

	submitClass = signal('');
	error$ = new Subject();

	protected doCheck$ = new ReplaySubject<void>(1);

	public intl = getIntl(LU_MODAL_TRANSLATIONS);
	protected title$ = this.observeValue(() => this.#contentComponentInstance.title);
	protected submitLabel$ = this.observeValue(() => this.#contentComponentInstance.submitLabel || this.intl.submit);
	protected cancelLabel$ = this.observeValue(() => this.#contentComponentInstance.cancelLabel || this.intl.cancel);
	protected submitCounter$ = this.observeValue(() => this.#contentComponentInstance.submitCounter);
	protected submitDisabled$ = this.observeValue(() => this.#contentComponentInstance.submitDisabled);
	protected hasSubmitCounter$ = this.submitCounter$.pipe(map(Boolean));
	protected hasSubmit$ = this.observeValue(() => this.#contentComponentInstance.submitAction).pipe(map(Boolean));

	get submitPalette() {
		return (this.#contentComponentInstance.submitPalette || 'product') as Palette;
	}

	private observeValue<TValue>(selector: () => TValue | Observable<TValue>): Observable<TValue> {
		return this.doCheck$.pipe(
			takeUntilDestroyed(this.#destroyRef),
			map(selector),
			distinctUntilChanged(),
			switchMap((value) => (isObservable(value) ? value : of(value))),
		);
	}

	submit(): void {
		this.error$.next(undefined);
		this.submitClass.set('is-loading');
		if (this.#contentComponentInstance.submitAction) {
			const result$ = this.#contentComponentInstance.submitAction();
			if (isObservable(result$)) {
				result$
					.pipe(
						tap(() => this.submitClass.set('is-success')),
						delay(500),
						takeUntilDestroyed(this.#destroyRef),
					)
					.subscribe({
						next: (res) => this.ref.close(res as LuModalContentResult<C>),
						error: (err) => {
							this.submitClass.set('is-error');
							this.error$.next(err);
							setTimeout(() => {
								this.submitClass.set('');
							}, 2000);
						},
						complete: () => this.submitClass.set(''),
					});
			} else {
				this.ref.close(result$ as LuModalContentResult<C>);
			}
		} else {
			this.ref.close(undefined);
		}
	}

	dismiss(): void {
		this.ref.dismiss();
	}

	close(res: LuModalContentResult<C>): void {
		this.ref.close(res);
	}

	ngDoCheck(): void {
		this.doCheck$.next();
	}

	ngOnInit(): void {
		const injector = Injector.create({
			providers: [
				{ provide: ALuModalRef, useValue: this },
				{ provide: LU_MODAL_DATA, useValue: this.dialogData.data },
			],
			parent: this.#injector,
		});
		this.#contentComponentInstance = this.contentProjectionRef.createComponent(this.dialogData.component, {
			injector,
		}).instance;
	}
}
