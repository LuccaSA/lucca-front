import { Component, computed, DestroyRef, inject, Injector, OnInit, runInInjectionContext, TemplateRef, viewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { LuDialogRef } from '../model';
import { LuDialogService } from '../dialog.service';
import { provideLuDialog } from '../dialog.providers';
import { DialogRouteConfig } from './dialog-routing.models';
import { deferrableToPromise, DIALOG_ROUTE_CONFIG } from './dialog-routing.utils';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { from } from 'rxjs';
import { DIALOG_DATA } from '@angular/cdk/dialog';

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
				<ng-container [ngComponentOutlet]="componentType" [ngComponentOutletInjector]="customInjector" />
			}
			@if (dialogTemplateContent(); as templateRef) {
				<ng-container [ngTemplateOutlet]="templateRef" [ngTemplateOutletInjector]="customInjector" />
			}
		</ng-template>
	`,
	standalone: true,
	imports: [NgComponentOutlet, NgTemplateOutlet],
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

	#ref?: LuDialogRef<C>;

	async ngOnInit(): Promise<void> {
		const dialogConfig = await this.#dialogConfig;
		this.#ref = this.#dialog.open<C>({
			...dialogConfig,
			content: this.dialogTemplate(),
		});
		this.#ref.result$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((result) =>
			runInInjectionContext(this.injector, () => {
				this.#config.onClosed ? this.#config.onClosed(result) : defaultOnClosedFn();
			}),
		);

		this.#ref.dismissed$
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe(() => runInInjectionContext(this.injector, () => (this.#config.onDismissed ? this.#config.onDismissed() : defaultOnClosedFn())));
	}
}
