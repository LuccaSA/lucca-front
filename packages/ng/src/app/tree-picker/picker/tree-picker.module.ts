import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuTreePickerComponent } from './index';
import { LuPopoverModule } from '../../../app/popover/popover.module';

@NgModule({
	imports: [
		CommonModule,
		LuPopoverModule,
	],
	declarations: [
		LuTreePickerComponent,
	],
	exports: [
		LuTreePickerComponent,
	],
})
export class LuTreePickerModule { }
