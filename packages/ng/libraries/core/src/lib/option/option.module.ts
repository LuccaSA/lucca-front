import { NgModule } from '@angular/core';
import { LuOptionItemModule } from './item/index';
import { LuOptionPickerModule } from './picker/index';
import { LuOptionOperatorModule } from './operator/index';

@NgModule({
	imports: [
		LuOptionItemModule,
		LuOptionPickerModule,
		LuOptionOperatorModule,
	],
	exports: [
		LuOptionItemModule,
		LuOptionPickerModule,
		LuOptionOperatorModule,
	],
})
export class LuOptionModule {}
