import { NgModule } from '@angular/core';

import { DemoNumberComponent } from './number.component';
import { LuNumberModule } from '@lucca-front/ng';
import { SharedModule } from '../shared/index';

import { BasicComponent } from './basic/basic';
import { FormsModule } from '@angular/forms';
import { ParametersComponent } from './parameters/parameters';

@NgModule({
	imports: [
		LuNumberModule,
		SharedModule,
		FormsModule,
	],
	declarations: [
		DemoNumberComponent,
		BasicComponent,
		ParametersComponent,
	],
	exports: [DemoNumberComponent],
})
export class DemoNumberModule {}
