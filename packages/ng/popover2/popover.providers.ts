import { EnvironmentProviders, importProvidersFrom, makeEnvironmentProviders } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

export function configureLuPopover(): EnvironmentProviders {
	return makeEnvironmentProviders([importProvidersFrom(OverlayModule)]);
}
