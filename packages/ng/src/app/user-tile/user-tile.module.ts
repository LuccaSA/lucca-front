import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuUserTileComponent } from './user-tile.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [LuUserTileComponent],
	exports: [LuUserTileComponent]
})
export class LuUserTileModule { }
