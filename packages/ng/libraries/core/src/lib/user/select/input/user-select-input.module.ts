import { NgModule } from '@angular/core';
import { LuUserSelectInputComponent } from './user-select-input.component';
import { CommonModule } from '@angular/common';
import { LuUserDisplayModule } from '../../display/index';
import { LuOptionOperatorModule, LuOptionItemModule, LuOptionPickerModule } from '../../../option/index';
import { LuUserOperatorModule } from '../operator/index';

@NgModule({
	imports: [
		LuUserDisplayModule,
		LuOptionItemModule,
		LuOptionOperatorModule,
		LuUserOperatorModule,
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
