import { NgModule } from '@angular/core';
import { ClearComponent } from '../clear/clear.component';
import { LuInputDisplayerDirective } from './displayer/index';
import { LuInputDirective } from './input.directive';

@NgModule({
	imports: [LuInputDirective, LuInputDisplayerDirective, ClearComponent],
	exports: [LuInputDirective, LuInputDisplayerDirective, ClearComponent],
})
export class LuInputModule {}
