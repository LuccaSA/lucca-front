import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuDepartmentPickerComponent } from './department-picker.component';
import { HttpClientModule } from '@angular/common/http';
import { LuPopoverModule } from '../../popover';
import { OverlayModule } from '@angular/cdk/overlay';
import { DepartmentPickerService } from './department-picker.service';
import { LuDepartmentPickerItemComponent } from './/department-picker-item/department-picker-item.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		OverlayModule,
	],
	providers: [
		DepartmentPickerService,
	],
	declarations: [
		LuDepartmentPickerComponent,
		LuDepartmentPickerItemComponent,
	],
	exports: [
		LuDepartmentPickerComponent,
	],
})
export class LuDepartmentPickerModule { }
