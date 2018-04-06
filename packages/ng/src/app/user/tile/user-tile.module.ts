import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuUserDisplayModule } from '../display';
import { LuUserPictureModule } from '../picture';
import { LuUserTileComponent } from './user-tile.component';

@NgModule({
	imports: [CommonModule, LuUserPictureModule, LuUserDisplayModule],
	declarations: [LuUserTileComponent],
	exports: [LuUserTileComponent],
})
export class LuUserTileModule {}
