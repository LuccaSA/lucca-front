import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuUserTileModule } from './user-tile';
import { UserNamePipe } from './user-name.pipe';

@NgModule({
	imports: [
		CommonModule,
		LuUserTileModule,
	],
	declarations: [
		UserNamePipe,
	],
	exports: [
		UserNamePipe,
	]
})
export class LuUserModule { }
