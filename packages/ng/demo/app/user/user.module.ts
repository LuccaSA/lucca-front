import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoUserDisplayModule } from './display/user-display.module';
import { DemoUserTileModule } from './tile/user-tile.module';
@NgModule({
	imports: [
		CommonModule,
		DemoUserDisplayModule,
		DemoUserTileModule,
	],
	declarations: [
	],
	exports: [
	]
})
export class DemoUserModule { }
