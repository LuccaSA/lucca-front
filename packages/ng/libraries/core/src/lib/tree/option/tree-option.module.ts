import { NgModule } from '@angular/core';
import { LuTreeOptionItemModule } from './item/index';
import { LuTreeOptionPickerModule } from './picker/index';
import { LuTreeOptionOperatorModule } from './operator/index';

@NgModule({
	imports: [
		LuTreeOptionItemModule,
		LuTreeOptionPickerModule,
		LuTreeOptionOperatorModule,
	],
	exports: [
		LuTreeOptionItemModule,
		LuTreeOptionPickerModule,
		LuTreeOptionOperatorModule,
	],
})
export class LuTreeOptionModule {}
