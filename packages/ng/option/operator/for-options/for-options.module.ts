import { NgModule } from '@angular/core';
import { LuForOptionsDirective } from './for-options.directive';

/**
 * @deprecated use `LuForOptionsDirective` instead
 */
@NgModule({
	imports: [LuForOptionsDirective],
	exports: [LuForOptionsDirective],
})
export class LuForOptionsModule {}
