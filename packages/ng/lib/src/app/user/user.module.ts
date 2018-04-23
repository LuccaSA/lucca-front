import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuUserTileModule } from './tile';
import { LuUserPictureModule } from './picture';
import { LuUserDisplayModule } from './display';
import { LuSelectModule } from '../select';

@NgModule({
	imports: [
		CommonModule,
		LuUserTileModule,
		LuUserPictureModule,
		LuUserDisplayModule,
		LuSelectModule,
	],
	declarations: [],
	exports: [
		LuUserPictureModule,
		LuUserDisplayModule,
		LuUserTileModule,
		LuSelectModule,
	],
})
export class LuUserModule {}
