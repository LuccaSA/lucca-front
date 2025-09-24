import { ChangeDetectionStrategy, Component, DestroyRef, inject, Injector, OnDestroy, OnInit, runInInjectionContext, signal, TemplateRef, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, CanDeactivateFn, GuardResult, Router, RouterOutlet } from '@angular/router';
import { combineLatest, concat, map, Observable, of } from 'rxjs';
import { provideLuDialog } from '../dialog.providers';
import { LuDialogService } from '../dialog.service';
import { LuDialogRef } from '../model';
import { DialogRouteData, DialogRouteDialogConfig } from './dialog-routing.models';
import { deferrableToObservable, deferrableToPromise, DialogResolveFn } from './dialog-routing.utils';

export const defaultOnClosedFn = <C>(router = inject(Router), route = inject(ActivatedRoute)): void => {
	const routeData = route.snapshot.data as DialogRouteData<C>;
	const next = routeData.dialogRouteConfig.path
		.split('/')
		.map(() => '..')
		.join('/');

	return void router.navigate([next], {
		relativeTo: route.children[0],
		queryParamsHandling: 'preserve',
	});
};

@Component({
	selector: 'lu-dialog-routing-container',
	imports: [RouterOutlet],
	template: `
		<ng-template>
			<router-outlet (activate)="dialogComponentInstance.set($event)" (deactivate)="dialogComponentInstance.set(null)" />
		</ng-template>
	`,
	styles: [
		`
			:host {
				display: none;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [provideLuDialog()],
})
export class DialogRoutingContainerComponent<C> implements OnDestroy, OnInit {
	readonly #route = inject(ActivatedRoute);
	readonly #router = inject(Router);
	readonly #destroyRef = inject(DestroyRef);
	readonly #dialog = inject(LuDialogService);
	readonly injector = inject(Injector);
	readonly #config = this.#routeData.dialogRouteConfig;
	protected readonly dialogComponentInstance = signal<C | null>(null);
	protected readonly dialogTemplate = viewChild.required(TemplateRef);

	#ref?: LuDialogRef<C>;

	get #routeData(): DialogRouteData<C> {
		return this.#route.snapshot.data as DialogRouteData<C>;
	}

	ngOnInit(): void {
		void this.#openDialog();
	}

	ngOnDestroy(): void {
		this.#ref?.dismiss();
	}

	async #openDialog(): Promise<void> {
		const [data, dialogConfig] = await Promise.all([this.#resolve(this.#config.dataFactory), this.#resolve(this.#config.dialogConfigFactory)]);

		this.#ref = this.#dialog.open<C>({
			...dialogConfig,
			content: this.dialogTemplate(),
			data,
			canClose: this.#getCanCloseFn(dialogConfig),
		});

		this.#ref.result$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((result) =>
			runInInjectionContext(this.injector, () => {
				if (this.#config.onClosed) {
					this.#config.onClosed(result);
				} else {
					defaultOnClosedFn();
				}
			}),
		);

		this.#ref.dismissed$
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe(() => runInInjectionContext(this.injector, () => (this.#config.onDismissed ? this.#config.onDismissed() : defaultOnClosedFn())));
	}

	#getCanCloseFn(config: DialogRouteDialogConfig<C>): ((c: C) => Observable<boolean>) | undefined {
		const canCloseFns: ((c: C) => Observable<boolean>)[] = [];

		if (config.canClose) {
			canCloseFns.push((c: C) => deferrableToObservable(config.canClose(c)));
		}

		if (this.#config.canDeactivate) {
			canCloseFns.push(this.#getCanCloseFromGuardDialogFn(this.#config.canDeactivate));
		}

		return canCloseFns.length ? (c: C) => combineLatest(canCloseFns.map((fn) => fn(c))).pipe(map((results) => results.every((r) => r))) : undefined;
	}

	#getCanCloseFromGuardDialogFn(canDeactivate: CanDeactivateFn<C>[]): () => Observable<boolean> {
		return () => {
			const results$ = canDeactivate.map((cD) => this.#callCanDeactivateFn(cD));

			return concat(...results$).pipe(
				map((guardResult) => {
					if (typeof guardResult === 'boolean') {
						return guardResult;
					}
					void this.#router.navigate([guardResult]);
					return true;
				}),
			);
		};
	}

	#callCanDeactivateFn(canDeactivateFn: CanDeactivateFn<C>): Observable<GuardResult> {
		const instance = this.dialogComponentInstance();

		if (!instance) {
			// If instance is null, it means the dialog is already closed. We allow deactivation in this case.
			return of(true);
		}

		const maybeAsyncResult = runInInjectionContext(this.injector, () => canDeactivateFn(instance, this.#route.snapshot, this.#router.routerState.snapshot, this.#router.routerState.snapshot));
		return deferrableToObservable(maybeAsyncResult);
	}

	async #resolve<T>(resolveFn: DialogResolveFn<T>): Promise<T>;
	async #resolve<T>(resolveFn?: DialogResolveFn<T>): Promise<T | undefined>;
	async #resolve<T>(resolveFn: DialogResolveFn<T>): Promise<T | undefined> {
		if (!resolveFn) {
			return undefined;
		}

		const resolved = runInInjectionContext(this.injector, resolveFn);
		return deferrableToPromise(resolved);
	}
}
