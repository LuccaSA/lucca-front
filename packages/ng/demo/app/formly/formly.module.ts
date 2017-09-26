import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFormlyComponent } from './formly.component';
// import { LuUserTileModule } from '../../../src/app/user-tile/user-tile.module';
import { SharedModule } from '../shared/index';
// import { BasicComponent } from './basic/basic.component';

@NgModule({
	imports: [
		CommonModule,
		// LuUserTileModule,
		SharedModule,
		// MdTooltipModule
	],
	declarations: [
		DemoFormlyComponent,
	],
	exports: [
		DemoFormlyComponent,
	]
})
export class DemoFormlyModule { }
