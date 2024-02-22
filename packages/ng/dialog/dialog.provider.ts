import { EnvironmentProviders, importProvidersFrom, makeEnvironmentProviders } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { LuDialogService } from './dialog.service';

export function provideLuDialog(): EnvironmentProviders {
	return makeEnvironmentProviders([importProvidersFrom(DialogModule), LuDialogService]);
}
