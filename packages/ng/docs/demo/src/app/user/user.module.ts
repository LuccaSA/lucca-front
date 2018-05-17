import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoUserDisplayModule } from './display/user-display.module';
import { DemoUserTileModule } from './tile/user-tile.module';
import { DemoUserPictureModule } from './picture/user-picture.module';
import { DemoUserSelectModule } from './select/user-select-basic.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		DemoUserDisplayModule,
		DemoUserTileModule,
		DemoUserPictureModule,
		DemoUserSelectModule,
	],
})
export class DemoUserModule {}
