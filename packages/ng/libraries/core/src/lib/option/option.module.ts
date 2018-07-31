import { NgModule } from '@angular/core';
import { LuOptionItemModule } from './item/index';
import { LuOptionPickerModule } from './picker/index';
import { LuOptionOperatorModule } from './operator/index';
import { LuOptionDisplayerModule } from './displayer/index';

@NgModule({
	imports: [
		LuOptionItemModule,
		LuOptionPickerModule,
		LuOptionOperatorModule,
		LuOptionDisplayerModule,
	],
	exports: [
		LuOptionItemModule,
		LuOptionPickerModule,
		LuOptionOperatorModule,
		LuOptionDisplayerModule,
	],
})
export class LuOptionModule {}
