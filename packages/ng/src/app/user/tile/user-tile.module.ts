import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuUserPictureModule, } from '../picture';
import { LuUserTileComponent } from './user-tile.component';

@NgModule({
	imports: [
		CommonModule,
		LuUserPictureModule,
	],
	declarations: [
		LuUserTileComponent,
	],
	exports: [
		LuUserTileComponent,
	]
})
export class LuUserTileModule { }
