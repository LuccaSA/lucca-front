import { Deferrable } from './dialog-routing.utils';
import { LuDialogConfig, LuDialogResult } from '../model';
import { EnvironmentProviders, Provider } from '@angular/core';

export interface DialogRouteConfig<C> {
	path: string;
	dialogConfigFactory: () => Deferrable<LuDialogConfig<C>>;
	providers?: (Provider | EnvironmentProviders)[] | undefined;
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
}
