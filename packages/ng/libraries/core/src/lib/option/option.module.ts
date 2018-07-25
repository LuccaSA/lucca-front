import { NgModule } from '@angular/core';
import { LuOptionItemModule } from './item/index';
import { LuOptionPickerModule } from './picker/index';

@NgModule({
	imports: [
		LuOptionItemModule,
		LuOptionPickerModule,
	],
	exports: [
		LuOptionItemModule,
		LuOptionPickerModule,
	],
})
export class LuOptionModule {}
