import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { LU_FORMLY_CONFIG } from './formly.config';

export function provideLuFormly(): EnvironmentProviders {
	return importProvidersFrom(FormlyModule.forChild(LU_FORMLY_CONFIG));
}
