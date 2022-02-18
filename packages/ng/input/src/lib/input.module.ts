import { NgModule } from '@angular/core';
import { LuInputDisplayerModule } from './displayer/index';
import { LuInputDirective } from './input.directive';
import { LuInputClearerModule } from './clearer/index';

@NgModule({
	declarations: [LuInputDirective],
	imports: [LuInputDisplayerModule, LuInputClearerModule],
	exports: [LuInputDisplayerModule, LuInputClearerModule, LuInputDirective],
})
export class LuInputModule {}
