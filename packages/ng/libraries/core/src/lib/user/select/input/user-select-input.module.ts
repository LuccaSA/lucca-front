import { NgModule } from '@angular/core';
import { LuUserSelectInputComponent } from './user-select-input.component';
import { CommonModule } from '@angular/common';
import { LuUserDisplayModule } from '../../display/index';
import { LuOptionOperatorModule, LuOptionItemModule, LuOptionPickerModule } from '../../../option/index';
import { LuUserOperatorModule } from '../operator/index';
import { LuSelectClearerModule } from '../../../select/index';

@NgModule({
	imports: [
		CommonModule,
		LuUserDisplayModule,
		LuOptionItemModule,
		LuOptionOperatorModule,
		LuUserOperatorModule,
		LuOptionPickerModule,
		LuSelectClearerModule,
	],
	declarations: [
		LuUserSelectInputComponent,
	],
	exports: [
		LuUserSelectInputComponent,
	],
})
export class LuUserSelectInputModule {}
