import { NgModule } from '@angular/core';
import { LuDisplayerDirective } from './displayer.directive';
import { LuOptionDirective } from './option.directive';

@NgModule({
	declarations: [LuOptionDirective, LuDisplayerDirective],
	exports: [LuOptionDirective, LuDisplayerDirective],
})
export class LuOption2Module {}
