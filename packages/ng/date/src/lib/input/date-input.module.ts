import { NgModule } from '@angular/core';
import { LuDateInputDirective } from './date-input.directive';
import { LuDateInputIntl } from './date-input.intl';
import { luDateInputTranslations } from './date-input.translate';
import { LU_DATE_INPUT_TRANSLATIONS } from './date-input.token';

@NgModule({
	imports: [],
	exports: [LuDateInputDirective],
	declarations: [LuDateInputDirective],
	providers: [
		LuDateInputIntl,
		{ provide: LU_DATE_INPUT_TRANSLATIONS, useValue: luDateInputTranslations },
	],
})
export class LuDateInputModule {}
