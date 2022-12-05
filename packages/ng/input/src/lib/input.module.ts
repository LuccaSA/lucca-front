import { NgModule } from '@angular/core';
import { LuInputClearerComponent } from './clearer/index';
import { LuInputDisplayerDirective } from './displayer/index';
import { LuInputDirective } from './input.directive';

@NgModule({
	imports: [LuInputDirective, LuInputDisplayerDirective, LuInputClearerComponent],
	exports: [LuInputDirective, LuInputDisplayerDirective, LuInputClearerComponent],
})
export class LuInputModule {}
