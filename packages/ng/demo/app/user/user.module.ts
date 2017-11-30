import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoUserDisplayModule } from './display/user-display.module'
@NgModule({
	imports: [
		CommonModule,
		DemoUserDisplayModule,
	],
	declarations: [
	],
	exports: [
	]
})
export class DemoUserModule { }
