import { NgModule } from '@angular/core';
import { LuTreeOptionSelectAllComponent } from './tree-select-all.component';
import { LuOptionSelectAllIntl } from './select-all.intl';
import { luOptionSelectAllTranslations } from './select-all.translate';
import { LU_OPTION_SELECT_ALL_TRANSLATIONS } from './select-all.token';

@NgModule({
	declarations: [LuTreeOptionSelectAllComponent],
	exports: [LuTreeOptionSelectAllComponent],
	providers: [
		{
			provide: LU_OPTION_SELECT_ALL_TRANSLATIONS,
			useValue: luOptionSelectAllTranslations,
		},
		LuOptionSelectAllIntl,
	],
})
export class LuTreeOptionSelectAllModule {}
