import { NgModule } from '@angular/core';
import { LuOptionPlaceholderComponent } from './option-placeholder.component';
import { LuOptionPlaceholderIntl } from './option-placeholder.intl';
import { luOptionPlaceholderTranslations } from './option-placeholder.translate';
import { LU_OPTION_PLACEHOLDER_TRANSLATIONS } from './option-placeholder.token';

@NgModule({
	declarations: [LuOptionPlaceholderComponent],
	exports: [LuOptionPlaceholderComponent],
	providers: [
		LuOptionPlaceholderIntl,
		{
			provide: LU_OPTION_PLACEHOLDER_TRANSLATIONS,
			useValue: luOptionPlaceholderTranslations,
		},
	],
})
export class LuOptionPlaceholderModule {}
