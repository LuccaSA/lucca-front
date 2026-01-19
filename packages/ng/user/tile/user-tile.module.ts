import { NgModule } from '@angular/core';
import { LuUserTileComponent } from './user-tile.component';

/**
 * @deprecated use `LuUserTileComponent` instead
 */
@NgModule({
	imports: [LuUserTileComponent],
	exports: [LuUserTileComponent],
})
export class LuUserTileModule {}
