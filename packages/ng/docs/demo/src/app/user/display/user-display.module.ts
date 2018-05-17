import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DemoUserDisplayComponent } from './user-display.component';
import { LuUserDisplayModule } from '@lucca-front/ng';

import { SharedModule } from '../../shared';
import { BasicComponent } from './basic/basic.component';
import { LuEmptyModule, LuSelectModule } from '@lucca-front/ng';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		LuUserDisplayModule,
		SharedModule,
		LuEmptyModule,
		LuSelectModule,
	],
	declarations: [DemoUserDisplayComponent, BasicComponent],
	exports: [DemoUserDisplayComponent, BasicComponent],
})
export class DemoUserDisplayModule {}
