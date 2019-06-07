import { NgModule } from '@angular/core';
import { LuTreeOptionItemModule } from './item/index';
import { LuTreeOptionPickerModule } from './picker/index';

@NgModule({
	imports: [
		LuTreeOptionItemModule,
		LuTreeOptionPickerModule,
	],
	exports: [
		LuTreeOptionItemModule,
		LuTreeOptionPickerModule,
	],
})
export class LuTreeOptionModule {}
