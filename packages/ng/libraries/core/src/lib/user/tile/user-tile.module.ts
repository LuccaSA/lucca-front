import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuUserDisplayModule } from '../display/index';
import { LuUserPictureModule } from '../picture/index';
import { LuUserTileComponent } from './user-tile.component';

@NgModule({
	imports: [CommonModule, LuUserPictureModule, LuUserDisplayModule],
	declarations: [LuUserTileComponent],
	exports: [LuUserTileComponent],
})
export class LuUserTileModule {}
