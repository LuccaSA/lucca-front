import { NgModule } from '@angular/core';
import { LuUserSelectInputComponent } from './user-select-input.component';
import { LuUserPickerModule } from '../../picker/index';
import { CommonModule } from '@angular/common';
import { LuUserDisplayModule } from '../../display/index';
import { LuOptionItemModule } from '../../../option/index';

@NgModule({
	imports: [
		LuUserPickerModule,
		LuUserDisplayModule,
		LuOptionItemModule,
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
