import { ComponentType } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
import { Route } from '@angular/router';
import { LuDialogConfig, LuDialogData, LuDialogResult } from '../model';
import { DialogResolveFn } from './dialog-routing.utils';

export type DialogRouteComponentLoader<C> =
	| {
			component: ComponentType<C>;
	  }
	| {
			loadComponent: () => Promise<ComponentType<C>>;
	  };

export type DialogRouteCloseTrigger = 'navigation' | 'dialog:closed';
export type DialogRouteDismissTrigger = 'navigation' | 'dialog:dismissed';

export type DialogRouteConfig<C> = DialogRouteComponentLoader<C> & {
	dialogConfigFactory: DialogResolveFn<DialogRouteDialogConfig<C>>;
	dataFactory: LuDialogData<C> extends never ? undefined : DialogResolveFn<LuDialogData<C>>;
	/**
	 * When the dialog is closed, this callback is called with the result of the dialog.
	 * This callback is called within injection context, so you can inject services in it.
	 *
	 * If needed, the reason the dialog was closed can retrieved using `inject(DIALOG_ROUTE_CLOSE_TRIGGER)`
	 */
	onClosed?: (res: LuDialogResult<C>) => unknown;
	/**
	 * When the dialog is dismissed, this callback is called.
	 * This callback is called within injection context, so you can inject services in it.
	 *
	 * If needed, the reason the dialog was dismissed can retrieved using `inject(DIALOG_ROUTE_DISMISS_TRIGGER)`
	 */
	onDismissed?: () => unknown;
} & Omit<Route, 'component' | 'loadComponent'>;

export type DialogRouteDialogConfig<C> = Omit<LuDialogConfig<C>, 'data' | 'content'>;

export interface DialogRouteData<C> {
	dialogRouteConfig: DialogRouteConfig<C>;
}

export const DIALOG_ROUTE_CLOSE_TRIGGER = new InjectionToken<DialogRouteCloseTrigger>('DIALOG_ROUTE_CLOSE_TRIGGER');
export const DIALOG_ROUTE_DISMISS_TRIGGER = new InjectionToken<DialogRouteDismissTrigger>('DIALOG_ROUTE_DISMISS_TRIGGER');
export const DIALOG_ROUTE_CONFIG = new InjectionToken<DialogRouteConfig<unknown>>('DIALOG_ROUTE_CONFIG');
