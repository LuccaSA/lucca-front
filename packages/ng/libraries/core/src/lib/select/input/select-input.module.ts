import { NgModule } from '@angular/core';
import { LuSelectInputComponent } from './select-input.component';
import { CommonModule } from '@angular/common';
import { LuSelectPickerModule } from '../picker/index';

@NgModule({
	imports: [
		CommonModule,
		LuSelectPickerModule,
	],
	declarations: [
		LuSelectInputComponent,
	],
	exports: [
		LuSelectInputComponent,
	],
})
export class LuSelectInputModule {}
