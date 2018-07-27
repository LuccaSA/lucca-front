import { NgModule } from '@angular/core';
import { LuUserSelectInputComponent } from './user-select-input.component';
import { LuUserPickerModule } from '../../picker/index';
import { CommonModule } from '@angular/common';
import { LuUserDisplayModule } from '../../display/index';
import { LuOptionOperatorModule, LuOptionItemModule, LuOptionPickerModule } from '../../../option/index';

@NgModule({
	imports: [
		// LuUserPickerModule,
		LuUserDisplayModule,
		LuOptionItemModule,
		LuOptionOperatorModule,
		LuOptionPickerModule,
		CommonModule,
	],
	declarations: [
		LuUserSelectInputComponent,
	],
	exports: [
		LuUserSelectInputComponent,
	],
})
export class LuUserSelectInputModule {}
