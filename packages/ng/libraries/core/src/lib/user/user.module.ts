import { NgModule } from '@angular/core';
import { LuUserDisplayModule } from './display/index';
import { LuUserPictureModule } from './picture/index';
import { LuUserTileModule } from './tile/index';
import { LuUserSelectModule } from './select/index';
import { LuUserPickerModule } from './picker/index';

@NgModule({
	imports: [
		LuUserDisplayModule,
		LuUserPictureModule,
		LuUserTileModule,
		LuUserSelectModule,
		LuUserPickerModule,
	],
	exports: [
		LuUserDisplayModule,
		LuUserPictureModule,
		LuUserTileModule,
		LuUserSelectModule,
		LuUserPickerModule,
	],
})
export class LuUserModule {}
