import { NgModule } from '@angular/core';
import { LuInputDisplayerDirective } from './input-displayer.directive';

/**
 * @deprecated use `LuInputDisplayerDirective` instead
 */
@NgModule({
	imports: [LuInputDisplayerDirective],
	exports: [LuInputDisplayerDirective],
})
export class LuInputDisplayerModule {}
