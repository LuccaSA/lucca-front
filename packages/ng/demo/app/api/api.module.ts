import { NgModule } from '@angular/core';
import { DemoApiPickerModule } from './picker/api-picker.module';
@NgModule({
	imports: [
		DemoApiPickerModule,
	],
	declarations: [
	],
	exports: [
		DemoApiPickerModule,
	]
})
export class DemoApiModule { }
