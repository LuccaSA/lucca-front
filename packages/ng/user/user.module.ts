import { NgModule } from '@angular/core';
import { LuUserDisplayModule } from './display/index';
import { LuUserPictureModule } from './picture/index';
import { LuUserSelectModule } from './select/index';
import { LuUserTileModule } from './tile/index';

/**
 * @deprecated use `LuUserDisplayPipe, LuUserPictureComponent, LuUserTileComponent` instead
 */
@NgModule({
	imports: [LuUserDisplayModule, LuUserPictureModule, LuUserTileModule, LuUserSelectModule],
	exports: [LuUserDisplayModule, LuUserPictureModule, LuUserTileModule, LuUserSelectModule],
})
export class LuUserModule {}
