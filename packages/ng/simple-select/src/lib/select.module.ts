import { NgModule } from '@angular/core';
import { LuSelectInputSimpleModule } from './input';
import { LuOption2Module } from './option';
import { LuSelectPanelModule } from './panel';

@NgModule({
	imports: [LuSelectInputSimpleModule, LuOption2Module, LuSelectPanelModule],
	exports: [LuSelectInputSimpleModule, LuOption2Module, LuSelectPanelModule],
})
export class LuSimpleSelectModule {}
