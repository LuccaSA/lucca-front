import { NgModule } from '@angular/core';
import { LuSelectInputComponent } from './select-input.component';
import { CommonModule } from '@angular/common';
import { LuOptionModule } from '../../option/index';

@NgModule({
	imports: [
		CommonModule,
		LuOptionModule,
	],
	declarations: [
		LuSelectInputComponent,
	],
	exports: [
		LuSelectInputComponent,
	],
})
export class LuSelectInputModule {}
