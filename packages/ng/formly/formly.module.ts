import { NgModule } from '@angular/core';
import { provideLuFormly } from './formly.providers';

/**
 * @deprecated use provideLuFormly() in a lazy loaded route (and stop using formly please)
 * */
@NgModule({
	providers: [provideLuFormly()],
})
export class LuFormlyModule {}
