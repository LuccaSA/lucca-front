import { NgModule } from '@angular/core';
import { DemoTreePickerStandAloneModule } from './tree-picker/demo-tree-picker.module';
import { LuTreeModule } from './../../../src/app/tree-picker';

@NgModule({
	imports: [
		LuTreeModule,
	],
	declarations: [
	],
	exports: [
		DemoTreePickerStandAloneModule,
	]
})
export class DemoTreePickerModule { }
