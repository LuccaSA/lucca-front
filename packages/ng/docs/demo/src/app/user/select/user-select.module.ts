import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DemoUserSelectComponent } from './user-select.component';
import { LuUserSelectModule } from '@lucca-front/ng';

import { SharedModule } from '../../shared';
import { BasicComponent } from './basic/basic';
import { LuEmptyModule, LuSelectModule } from '@lucca-front/ng';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		LuUserSelectModule,
		SharedModule,
		LuEmptyModule,
		LuSelectModule,
	],
	declarations: [DemoUserSelectComponent, BasicComponent],
	exports: [DemoUserSelectComponent, BasicComponent],
})
export class DemoUserSelectModule {}
