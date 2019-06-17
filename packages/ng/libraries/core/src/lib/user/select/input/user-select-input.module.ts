import { NgModule } from '@angular/core';
import { LuUserSelectInputComponent } from './user-select-input.component';
import { CommonModule } from '@angular/common';
import { LuUserDisplayModule } from '../../display/index';
import { LuOptionOperatorModule, LuOptionItemModule, LuOptionPickerModule } from '../../../option/index';
import { LuSelectClearerModule } from '../../../select/index';
import { LuUserSearcherModule } from '../searcher/index';
import { LuInputDisplayerModule } from '../../../input/index';
import { LU_USER_SELECT_INPUT_TRANSLATIONS } from './user-select-input.token';
import { luUserSelectInputTranslations } from './user-select-input.translate';
import { LuUserSelectInputIntl } from './user-select-input.intl';

@NgModule({
	imports: [
		CommonModule,
		LuUserDisplayModule,
		LuOptionItemModule,
		LuOptionOperatorModule,
		LuOptionPickerModule,
		LuSelectClearerModule,
		LuUserSearcherModule,
		LuInputDisplayerModule,
	],
	declarations: [
		LuUserSelectInputComponent,
	],
	exports: [
		LuUserSelectInputComponent,
	],
	providers: [
		{ provide: LU_USER_SELECT_INPUT_TRANSLATIONS, useValue: luUserSelectInputTranslations },
		LuUserSelectInputIntl,
	]
})
export class LuUserSelectInputModule {}
