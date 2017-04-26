import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoLolComponent } from './lol.component';
import { LuLolModule } from '../../../src';
import { BasicComponent } from './basic/basic.component';

@NgModule({
	imports: [
		CommonModule,
		LuLolModule,
	],
	declarations: [
		DemoLolComponent,
		BasicComponent,
	]
})
export class DemoLolModule { }
