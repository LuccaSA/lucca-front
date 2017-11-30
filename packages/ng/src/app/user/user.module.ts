import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuUserTileModule } from './user-tile';
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
	]
})
export class LuUserModule { }
