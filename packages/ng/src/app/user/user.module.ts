import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuUserTileModule } from './user-tile/user-tile.module';

@NgModule({
	imports: [
		CommonModule,
		LuUserModule
	],
	declarations: [],
	exports: [LuUserModule]
})
export class LuUserModule { }
