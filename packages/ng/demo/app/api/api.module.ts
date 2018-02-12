import { NgModule } from '@angular/core';
import { DemoApiPickerModule } from './picker/api-picker.module';
import { DemoDepartmentPickerComponent } from './department-picker/demo-department-picker.component';
import { DemoDepartmentPickerModule } from './department-picker/demo-department-picker.module';

@NgModule({
	imports: [
		DemoApiPickerModule,
	],
	declarations: [],
	exports: [
		DemoApiPickerModule,
		DemoDepartmentPickerModule,
	]
})
export class DemoApiModule { }
