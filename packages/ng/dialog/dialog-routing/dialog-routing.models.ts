import { CanDeactivateFn, Route } from '@angular/router';
import { LuDialogConfig, LuDialogResult } from '../model';
import { Deferrable } from './dialog-routing.utils';

export type DialogRouteConfig<C> = {
	dialogConfigFactory: () => Deferrable<LuDialogConfig<C>>;
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
	canDeactivate?: CanDeactivateFn<C>[];
} & Omit<Route, 'component' | 'canDeactivate'>;
