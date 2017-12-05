import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuUserTileModule } from './tile';
import { LuUserPictureModule } from './picture';
import { LuUserDisplayModule } from './display';

@NgModule({
	imports: [
		CommonModule,
		LuUserTileModule,
		LuUserPictureModule,
		LuUserDisplayModule,
	],
	declarations: [
	],
	exports: [
		LuUserPictureModule,
		LuUserDisplayModule,
		LuUserTileModule,
	]
})
export class LuUserModule { }
