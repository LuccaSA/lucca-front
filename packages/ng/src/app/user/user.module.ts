import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuUserTileModule } from './user-tile';
import { LuUserDisplayPipe } from './user-display.pipe';

@NgModule({
	imports: [
		CommonModule,
		LuUserTileModule,
	],
	declarations: [
		LuUserDisplayPipe,
	],
	exports: [
		LuUserDisplayPipe,
	]
})
export class LuUserModule { }
