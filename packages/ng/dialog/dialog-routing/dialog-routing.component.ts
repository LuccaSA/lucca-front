import { ChangeDetectionStrategy, Component, DestroyRef, inject, Injector, OnDestroy, OnInit, runInInjectionContext, signal, TemplateRef, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, CanDeactivateFn, GuardResult, Router, RouterOutlet } from '@angular/router';
import { combineLatest, concat, map, Observable, of } from 'rxjs';
import { provideLuDialog } from '../dialog.providers';
import { LuDialogService } from '../dialog.service';
import { LuDialogRef, LuDialogResult } from '../model';
import { DialogRouteCloseTrigger, DialogRouteData, DialogRouteDialogConfig, DialogRouteDismissTrigger } from './dialog-routing.models';
import { deferrableToObservable, deferrableToPromise, DialogResolveFn } from './dialog-routing.utils';

export const defaultOnClosedFn = <C>(trigger?: DialogRouteCloseTrigger | DialogRouteDismissTrigger): void => {
	if (trigger === 'navigation') {
		// If the dialog is closed because of a navigation, we don't need to do anything.
		// It would cancel the navigation that is already in progress.
		return;
	}

	const router = inject(Router);
	const route = inject(ActivatedRoute);
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
	#closeTrigger?: DialogRouteCloseTrigger | DialogRouteDismissTrigger;

	#ref?: LuDialogRef<C>;

	get #routeData(): DialogRouteData<C> {
		return this.#route.snapshot.data as DialogRouteData<C>;
	}

	ngOnInit(): void {
		void this.#openDialog();
	}

	/**
	 * In this context, ngOnDestroy is called when the user navigates away from the route.
	 * The navigation can be triggered:
	 * - from within the dialog (#ref.dismissed => config.onClosed/defaultOnClosedFn/config.onDismissed/defaultOnClosedFn => ngOnDestroy)
	 * - from router navigation (ngOnDestroy => #ref.dismissed => config.onDismissed/defaultOnClosedFn)
	 */
	ngOnDestroy(): void {
		this.#closeTrigger ??= 'navigation';
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

		this.#ref.result$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((result) => this.#onDialogClosed(result));
		this.#ref.dismissed$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => this.#onDialogDismissed());
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

	#onDialogDismissed(): void {
		runInInjectionContext(this.injector, () => {
			this.#closeTrigger ??= 'dialog:dismissed';

			if (this.#closeTrigger === 'dialog:closed') {
				throw new Error('Dialog cannot be both closed and dismissed');
			}

			if (this.#config.onDismissed) {
				this.#config.onDismissed(this.#closeTrigger);
			} else {
				defaultOnClosedFn(this.#closeTrigger);
			}
		});
	}

	#onDialogClosed(result: LuDialogResult<C>): void {
		runInInjectionContext(this.injector, () => {
			this.#closeTrigger ??= 'dialog:closed';

			if (this.#closeTrigger === 'dialog:dismissed') {
				throw new Error('Dialog cannot be both closed and dismissed');
			}

			if (this.#config.onClosed) {
				this.#config.onClosed(result, this.#closeTrigger);
			} else {
				defaultOnClosedFn(this.#closeTrigger);
			}
		});
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
