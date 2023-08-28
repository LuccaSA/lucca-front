import { NgModule } from '@angular/core';
import { LuScrollDirective } from './scroll.directive';

@NgModule({
	imports: [LuScrollDirective],
	exports: [LuScrollDirective],
})
export class LuScrollModule {}
