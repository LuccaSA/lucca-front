import { NgModule } from '@angular/core';
import { LuUserSelectInputComponent } from './user-select-input.component';
import { CommonModule } from '@angular/common';
import { LuUserDisplayModule } from '../../display/index';
import { LuOptionOperatorModule, LuOptionItemModule, LuOptionPickerModule } from '../../../option/index';
import { LuSelectClearerModule } from '../../../select/index';
import { LuUserSearcherModule } from '../searcher/index';
import { LuInputDisplayerModule } from '../../../input/index';

@NgModule({
	imports: [
		CommonModule,
		LuUserDisplayModule,
		LuOptionItemModule,
		LuOptionOperatorModule,
		LuOptionPickerModule,
		LuSelectClearerModule,
		LuUserSearcherModule,
		LuInputDisplayerModule
	],
	declarations: [
		LuUserSelectInputComponent,
	],
	exports: [
		LuUserSelectInputComponent,
	],
})
export class LuUserSelectInputModule {}
