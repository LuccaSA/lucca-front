import { NgModule } from '@angular/core';
// import { LuPopoverModule } from '../../popover/index';
import { LuSelectInputComponent } from './select-input.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		// LuPopoverModule,
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
