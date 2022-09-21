import { NgModule } from '@angular/core';
import { LuInputClearerComponent } from './clearer/index';
import { LuInputDisplayerModule } from './displayer/index';
import { LuInputDirective } from './input.directive';

@NgModule({
	declarations: [LuInputDirective],
	imports: [LuInputDisplayerModule, LuInputClearerComponent],
	exports: [LuInputDisplayerModule, LuInputClearerComponent, LuInputDirective],
})
export class LuInputModule {}
