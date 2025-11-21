import { NgModule } from '@angular/core';
import { LuScrollDirective } from './scroll.directive';

/**
 * @deprecated use `LuScrollDirective` instead
 */
@NgModule({
	imports: [LuScrollDirective],
	exports: [LuScrollDirective],
})
export class LuScrollModule {}
