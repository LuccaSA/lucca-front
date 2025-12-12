import { NgModule } from '@angular/core';
import { LuUserMeOptionDirective } from './me-option.directive';

/**
 * @deprecated use `LuUserMeOptionDirective` instead
 */
@NgModule({
	imports: [LuUserMeOptionDirective],
	exports: [LuUserMeOptionDirective],
})
export class LuUserMeOptionModule {}
