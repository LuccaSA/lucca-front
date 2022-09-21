import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { LuInputClearerComponent, LuInputDisplayerModule, LuInputModule } from '@lucca-front/ng/input';
import { LuDateAdapterModule } from '../adapter/index';
import { LuDatePickerModule } from '../picker/index';
import { LuDateSelectInputComponent } from './date-select-input.component';
import { LuDateSelectInputIntl } from './date-select-input.intl';
import { LU_DATE_SELECT_INPUT_TRANSLATIONS } from './date-select-input.token';
import { luDateSelectInputTranslations } from './date-select-input.translate';

@NgModule({
	imports: [LuDateAdapterModule, LuDatePickerModule, LuInputModule, OverlayModule, LuInputClearerComponent, LuInputDisplayerModule],
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
