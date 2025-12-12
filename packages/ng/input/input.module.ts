import { NgModule } from '@angular/core';
import { LuInputClearerComponent } from './clearer';
import { LuInputDisplayerDirective } from './displayer/index';
import { LuInputDirective } from './input.directive';

/**
 * @deprecated use `LuInputDirective, LuInputDisplayerDirective, LuInputClearerComponent` instead
 */
@NgModule({
	imports: [LuInputDirective, LuInputDisplayerDirective, LuInputClearerComponent],
	exports: [LuInputDirective, LuInputDisplayerDirective, LuInputClearerComponent],
})
export class LuInputModule {}
