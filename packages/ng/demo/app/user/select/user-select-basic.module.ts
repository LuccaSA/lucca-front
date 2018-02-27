import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoUserSelectComponent } from './user-select-basic.component';
import { DemoBasicUserSelectComponent } from './basic/basic';
import { LuUserSelectModule } from '../../../../src/app/user';
import { SharedModule } from '../../shared/index';


@NgModule({
	imports: [
		CommonModule,
		LuUserSelectModule,
		SharedModule,
	],
	declarations: [
		DemoUserSelectComponent,
		DemoBasicUserSelectComponent,
	],
	exports: [
		DemoUserSelectComponent,
		DemoBasicUserSelectComponent,
	],
})
export class DemoUserSelectModule { }
