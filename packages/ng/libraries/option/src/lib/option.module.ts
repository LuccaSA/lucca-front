import { NgModule } from '@angular/core';
import { LuOptionItemModule } from './item/index';
import { LuOptionPickerModule } from './picker/index';
import { LuOptionOperatorModule } from './operator/index';
import { LuOptionSelectorModule } from './selector/index';

@NgModule({
	imports: [
		LuOptionItemModule,
		LuOptionPickerModule,
		LuOptionOperatorModule,
		LuOptionSelectorModule,
	],
	exports: [
		LuOptionItemModule,
		LuOptionPickerModule,
		LuOptionOperatorModule,
		LuOptionSelectorModule,
	],
})
export class LuOptionModule {}
