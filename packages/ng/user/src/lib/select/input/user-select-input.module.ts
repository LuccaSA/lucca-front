import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuInputClearerModule, LuInputDisplayerModule } from '@lucca-front/ng/input';
import { LuOptionOperatorModule, LuOptionPickerModule } from '@lucca-front/ng/option';
import { LuUserDisplayModule } from '../../display/index';
import { LuUserHomonymsModule } from '../homonyms/index';
import { LuUserMeOptionModule } from '../me/index';
import { LuUserSearcherModule } from '../searcher/index';
import { LuUserSelectInputComponent } from './user-select-input.component';

@NgModule({
	imports: [
		CommonModule,
		LuUserDisplayModule,
		LuOptionOperatorModule,
		LuOptionPickerModule,
		LuInputClearerModule,
		LuUserSearcherModule,
		LuInputDisplayerModule,
		LuUserHomonymsModule,
		LuUserMeOptionModule,
	],
	declarations: [LuUserSelectInputComponent],
	exports: [LuUserSelectInputComponent],
})
export class LuUserSelectInputModule {}
