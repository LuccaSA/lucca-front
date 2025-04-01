import { DIALOG_DATA } from '@angular/cdk/dialog';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Component, computed, DestroyRef, inject, Injector, OnInit, runInInjectionContext, signal, TemplateRef, viewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, CanDeactivateFn, GuardResult, Router } from '@angular/router';
import { combineLatest, concat, from, map, Observable } from 'rxjs';
import { provideLuDialog } from '../dialog.providers';
import { LuDialogService } from '../dialog.service';
import { LuDialogConfig, LuDialogRef } from '../model';
import { DialogRouteConfig } from './dialog-routing.models';
import { deferrableToObservable, deferrableToPromise, DIALOG_ROUTE_CONFIG } from './dialog-routing.utils';
import { OutletComponentInstanceDirective } from './outlet-component-instance.directive';

export const defaultOnClosedFn = <C>(router = inject(Router), route = inject(ActivatedRoute), config = inject<DialogRouteConfig<C>>(DIALOG_ROUTE_CONFIG)): void =>
	void router.navigate(
		[
			config.path
				.split('/')
				.map(() => '..')
				.join('/'),
		],
		{
			relativeTo: route,
			queryParamsHandling: 'preserve',
		},
	);

@Component({
	selector: 'lu-dialog-routing',
	template: `
		<ng-template>
			@if (dialogComponentContent(); as componentType) {
				<ng-container luOutletComponentInstance [ngComponentOutlet]="componentType" [ngComponentOutletInjector]="customInjector" (instanceCreated)="componentInstance.set($event)" />
			}
			@if (dialogTemplateContent(); as templateRef) {
				<ng-container [ngTemplateOutlet]="templateRef" [ngTemplateOutletInjector]="customInjector" />
			}
		</ng-template>
	`,
	standalone: true,
	imports: [NgComponentOutlet, NgTemplateOutlet, OutletComponentInstanceDirective],
	styles: [
		`
			:host {
				display: none;
			}
		`,
	],
	providers: [provideLuDialog()],
})
export class DialogRoutingComponent<C> implements OnInit {
	readonly #route = inject(ActivatedRoute);
	readonly #router = inject(Router);
	readonly #destroyRef = inject(DestroyRef);
	readonly #dialog = inject(LuDialogService);
	readonly injector = inject(Injector);
	readonly #config = inject<DialogRouteConfig<C>>(DIALOG_ROUTE_CONFIG);
	readonly #dialogConfig = deferrableToPromise(this.#config.dialogConfigFactory());

	readonly dialogConfig = toSignal(from(this.#dialogConfig), {
		initialValue: null,
	});
	readonly dialogTemplateContent = computed(() => {
		const config = this.dialogConfig();
		return config && config.content instanceof TemplateRef ? config.content : null;
	});
	readonly dialogComponentContent = computed(() => {
		const config = this.dialogConfig();
		return config && !(config.content instanceof TemplateRef) ? config.content : null;
	});

	protected readonly dialogTemplate = viewChild.required(TemplateRef);

	readonly customInjector = Injector.create({
		parent: this.injector,
		providers: [
			{
				provide: DIALOG_DATA,
				useFactory: () => {
					const config = this.dialogConfig();
					return config && 'data' in config ? config.data : null;
				},
			},
			{
				provide: LuDialogRef,
				useFactory: () => this.#ref,
			},
		],
	});

	readonly componentInstance = signal<C | null>(null);

	#ref?: LuDialogRef<C>;

	ngOnInit(): void {
		void this.#openDialog();
	}

	async #openDialog(): Promise<void> {
		const dialogConfig = await this.#dialogConfig;
		this.#ref = this.#dialog.open<C>({
			...dialogConfig,
			content: this.dialogTemplate(),
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

	#getCanCloseFn(config: LuDialogConfig<C>): ((c: C) => Observable<boolean>) | undefined {
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
		const args = [this.componentInstance(), this.#route.snapshot, this.#router.routerState.snapshot, this.#router.routerState.snapshot] as const;
		const maybeAsyncResult = runInInjectionContext(this.injector, () => canDeactivateFn(...args));
		return deferrableToObservable(maybeAsyncResult);
	}
}
