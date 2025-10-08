import { ComponentType } from '@angular/cdk/overlay';
import { CanDeactivateFn, Route } from '@angular/router';
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
	 */
	onClosed?: (res: LuDialogResult<C>, trigger: DialogRouteCloseTrigger) => unknown;
	/**
	 * When the dialog is dismissed, this callback is called.
	 * This callback is called within injection context, so you can inject services in it.
	 * The trigger
	 */
	onDismissed?: (trigger: DialogRouteDismissTrigger) => unknown;

	/**
	 * Override canDeactivate to have a stricter type
	 */
	canDeactivate?: CanDeactivateFn<C>[];
} & Omit<Route, 'component' | 'loadComponent' | 'canDeactivate'>;

export type DialogRouteDialogConfig<C> = Omit<LuDialogConfig<C>, 'data' | 'content'>;

export interface DialogRouteData<C> {
	dialogRouteConfig: DialogRouteConfig<C>;
}
