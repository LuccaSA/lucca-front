import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DemoUserDisplayComponent } from './user-display.component';
import { LuUserDisplayModule } from '@lucca-front/ng';

import { SharedModule } from '../../shared';
import { BasicComponent } from './basic/basic.component';
import { LuSelectModule, LuInputModule, LuOptionModule } from '@lucca-front/ng';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		LuUserDisplayModule,
		SharedModule,
		LuSelectModule,
		LuInputModule,
		LuOptionModule,
	],
	declarations: [DemoUserDisplayComponent, BasicComponent],
	exports: [DemoUserDisplayComponent, BasicComponent],
})
export class DemoUserDisplayModule {}
