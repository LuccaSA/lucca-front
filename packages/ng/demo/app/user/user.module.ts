import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoUserDisplayModule } from './display/user-display.module';
import { DemoUserTileModule } from './tile/user-tile.module';
import { DemoUserPictureModule } from './picture/user-picture.module';
import { DemoUserSelectModule } from './select/user-select-basic.module';
@NgModule({
	imports: [
		CommonModule,
		DemoUserDisplayModule,
		DemoUserTileModule,
		DemoUserPictureModule,
		DemoUserSelectModule,
	],
	declarations: [
	],
	exports: [
	]
})
export class DemoUserModule { }
