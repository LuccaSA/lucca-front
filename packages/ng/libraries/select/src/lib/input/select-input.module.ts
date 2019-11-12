import { NgModule } from '@angular/core';
import { LuSelectInputComponent } from './select-input.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuSelectInputComponent,
	],
	exports: [
		LuSelectInputComponent,
	],
})
export class LuSelectInputModule {}
