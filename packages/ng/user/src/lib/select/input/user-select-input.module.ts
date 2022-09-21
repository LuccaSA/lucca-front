import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuInputClearerComponent, LuInputDisplayerModule } from '@lucca-front/ng/input';
import { LuOptionOperatorModule, LuOptionPickerModule } from '@lucca-front/ng/option';
import { LuUserDisplayModule } from '../../display/index';
import { LuUserHomonymsModule } from '../homonyms/index';
import { LuUserMeOptionModule } from '../me/index';
import { LuUserSearcherModule } from '../searcher/index';
import { LuUserSelectInputComponent } from './user-select-input.component';
import { LuUserSelectInputIntl } from './user-select-input.intl';
import { LU_USER_SELECT_INPUT_TRANSLATIONS } from './user-select-input.token';
import { luUserSelectInputTranslations } from './user-select-input.translate';

@NgModule({
	imports: [
		CommonModule,
		LuUserDisplayModule,
		LuOptionOperatorModule,
		LuOptionPickerModule,
		LuInputClearerComponent,
		LuUserSearcherModule,
		LuInputDisplayerModule,
		LuUserHomonymsModule,
		LuUserMeOptionModule,
	],
	declarations: [LuUserSelectInputComponent],
	exports: [LuUserSelectInputComponent],
	providers: [
		{
			provide: LU_USER_SELECT_INPUT_TRANSLATIONS,
			useValue: luUserSelectInputTranslations,
		},
		LuUserSelectInputIntl,
	],
})
export class LuUserSelectInputModule {}
