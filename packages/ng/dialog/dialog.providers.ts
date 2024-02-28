import { EnvironmentProviders, importProvidersFrom, makeEnvironmentProviders, Provider } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { LuDialogService } from './dialog.service';

export function configureLuDialog(): EnvironmentProviders {
	return makeEnvironmentProviders([importProvidersFrom(DialogModule)]);
}

export function provideLuDialog(): Provider {
	return LuDialogService;
}
