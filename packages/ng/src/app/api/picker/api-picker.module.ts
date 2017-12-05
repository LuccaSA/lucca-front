import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LuApiPickerDirective } from './api-picker.directive';
import { LuApiPickerComponent } from './api-picker.component';
import { HttpClientModule } from '@angular/common/http';
import { LuPopoverModule } from '../../popover';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		OverlayModule

	],
	declarations: [
		LuApiPickerDirective,
		LuApiPickerComponent,
	],
	exports: [
		LuApiPickerDirective,
		LuApiPickerComponent,
	],
})
export class LuApiPickerModule { }
