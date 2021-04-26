import { NgModule } from '@angular/core';
import { LuUserSelectInputComponent } from './user-select-input.component';
import { CommonModule } from '@angular/common';
import { LuUserDisplayModule } from '../../display/index';
import { LuOptionOperatorModule, LuOptionItemModule, LuOptionPickerModule } from '@lucca-front/ng/option';
import { LuUserSearcherModule } from '../searcher/index';
import { LuInputDisplayerModule, LuInputClearerModule } from '@lucca-front/ng/input';
import { LU_USER_SELECT_INPUT_TRANSLATIONS } from './user-select-input.token';
import { luUserSelectInputTranslations } from './user-select-input.translate';
import { LuUserSelectInputIntl } from './user-select-input.intl';
import { LuUserHomonymsModule } from '../homonyms/index';
import { LuUserMeOptionModule } from '../me/index';

@NgModule({
	imports: [
		CommonModule,
		LuUserDisplayModule,
		LuOptionItemModule,
		LuOptionOperatorModule,
		LuOptionPickerModule,
		LuInputClearerModule,
		LuUserSearcherModule,
		LuInputDisplayerModule,
		LuUserHomonymsModule,
		LuUserMeOptionModule,
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
