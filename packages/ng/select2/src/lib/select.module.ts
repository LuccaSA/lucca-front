import { NgModule } from '@angular/core';
import { LuSelectInput2Module } from './input';
import { LuOption2Module } from './option';
import { LuSelectPanelModule } from './panel';

@NgModule({
	imports: [LuSelectInput2Module, LuOption2Module, LuSelectPanelModule],
	exports: [LuSelectInput2Module, LuOption2Module, LuSelectPanelModule],
})
export class LuSelect2Module {}
