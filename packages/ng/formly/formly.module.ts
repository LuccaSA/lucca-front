import { importProvidersFrom, NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { LU_FORMLY_CONFIG } from './formly.config';

@NgModule({
	providers: [importProvidersFrom(FormlyModule.forChild(LU_FORMLY_CONFIG))],
})
export class LuFormlyModule {}
