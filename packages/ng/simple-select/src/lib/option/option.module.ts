import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuDisplayerDirective } from './displayer.directive';
import { LuOptionComponent } from './option.component';
import { LuOptionDirective } from './option.directive';

@NgModule({
	imports: [CommonModule],
	declarations: [LuOptionDirective, LuDisplayerDirective, LuOptionComponent],
	exports: [LuOptionDirective, LuDisplayerDirective, LuOptionComponent],
})
export class LuOption2Module {}
