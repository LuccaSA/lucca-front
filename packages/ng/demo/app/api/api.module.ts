import { NgModule } from '@angular/core';
import { DemoApiPickerModule } from './picker/api-picker.module';
import { DemoTreePickerModule } from './tree-picker/demo-tree-picker.module';

@NgModule({
	imports: [
	],
	declarations: [
	],
	exports: [
		DemoApiPickerModule,
		DemoTreePickerModule,
	]
})
export class DemoApiModule { }
