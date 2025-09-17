import { ComponentType } from '@angular/cdk/overlay';
import { CanDeactivateFn, DeprecatedGuard, ResolveFn, Route } from '@angular/router';
import { LuDialogConfig, LuDialogData, LuDialogResult } from '../model';

export type DialogRouteComponentLoader<C> =
	| {
			component: ComponentType<C>;
	  }
	| {
			loadComponent: () => Promise<ComponentType<C>>;
	  };

export type DialogRouteConfig<C> = DialogRouteComponentLoader<C> & {
	dialogConfigFactory: ResolveFn<DialogRouteDialogConfig<C>>;
	dataFactory: LuDialogData<C> extends never ? undefined : ResolveFn<LuDialogData<C>>;
	/**
	 * When the dialog is closed, this callback is called with the result of the dialog.
	 * This callback is called within injection context, so you can inject services in it.
	 */
	onClosed?: (res: LuDialogResult<C>) => unknown;
	/**
	 * When the dialog is dismissed, this callback is called.
	 * This callback is called within injection context, so you can inject services in it.
	 */
	onDismissed?: () => unknown;

	/**
	 * Override canDeactivate to have a stricter type
	 */
	canDeactivate?: (CanDeactivateFn<C> | DeprecatedGuard)[];
} & Omit<Route, 'component' | 'canDeactivate'>;

export type DialogRouteDialogConfig<C> = Omit<LuDialogConfig<C>, 'data' | 'content'>;

export interface DialogRouteResolvedData<C> {
	dialogConfig: DialogRouteDialogConfig<C>;
	dialogData: LuDialogData<C>;
}

export interface DialogRouteStaticData<C> {
	dialogRouteConfig: DialogRouteConfig<C>;
}

export type DialogRouteData<C> = DialogRouteResolvedData<C> & DialogRouteStaticData<C>;
export type DialogRouteResolveConfig<C> = {
	[key in keyof DialogRouteResolvedData<C>]: ResolveFn<DialogRouteResolvedData<C>[key]>;
};
