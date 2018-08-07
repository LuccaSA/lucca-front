import { NgModule } from '@angular/core';
import { LuInputDisplayerModule } from './displayer/index';
import { LuInputDirective } from './input.directive';

@NgModule({
	declarations: [LuInputDirective],
	imports: [LuInputDisplayerModule],
	exports: [LuInputDisplayerModule],
})
export class LuInputModule {}
