import { NgModule } from '@angular/core';
import { LuDateSelectInputComponent } from './date-select-input.component';
import { LuDateAdapterModule } from '../adapter/index';
import { LuDatePickerModule } from '../picker/index';
import {
	LuInputModule,
	LuInputClearerModule,
	LuInputDisplayerModule,
} from '@lucca-front/ng/input';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuDateSelectInputIntl } from './date-select-input.intl';
import { LU_DATE_SELECT_INPUT_TRANSLATIONS } from './date-select-input.token';
import { luDateSelectInputTranslations } from './date-select-input.translate';

@NgModule({
	imports: [
		LuDateAdapterModule,
		LuDatePickerModule,
		LuInputModule,
		OverlayModule,
		LuInputClearerModule,
		LuInputDisplayerModule,
	],
	exports: [LuDateSelectInputComponent],
	declarations: [LuDateSelectInputComponent],
	providers: [
		LuDateSelectInputIntl,
		{
			provide: LU_DATE_SELECT_INPUT_TRANSLATIONS,
			useValue: luDateSelectInputTranslations,
		},
	],
})
export class LuDateSelectInputModule {}
