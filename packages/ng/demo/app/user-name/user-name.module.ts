import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DemoUserNameComponent } from './user-name.component';
import { LuUserModule } from '../../../src/app/user';
import { LuUserTileModule } from '../../../src/app/user';
import { MatSelectModule } from '@angular/material';

import { SharedModule } from '../shared';
import { BasicComponent } from './basic/basic.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		LuUserModule,
		SharedModule,
		MatSelectModule,
	],
	declarations: [DemoUserNameComponent, BasicComponent],
	exports: [DemoUserNameComponent, BasicComponent]
})
export class DemoUserNameModule { }
