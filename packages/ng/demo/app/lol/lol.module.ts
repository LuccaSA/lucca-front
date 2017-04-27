import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoLolComponent } from './lol.component';
import { LuLolModule } from '../../../src';
import { BasicComponent } from './basic/basic.component';
import { SharedModule } from '../shared';

@NgModule({
	imports: [
		CommonModule,
		LuLolModule,
		SharedModule,
	],
	declarations: [
		DemoLolComponent,
		BasicComponent,
	],
	exports: [
		DemoLolComponent,
		BasicComponent,
	]
})
export class DemoLolModule { }
