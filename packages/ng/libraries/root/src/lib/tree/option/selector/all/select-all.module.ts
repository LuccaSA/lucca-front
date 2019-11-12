import { NgModule } from '@angular/core';
import { LuTreeOptionSelectAllComponent } from './select-all.component';
import { LuTreeOptionSelectAllIntl } from './select-all.intl';
import { luTreeOptionSelectAllTranslations } from './select-all.translate';
import { LU_TREE_OPTION_SELECT_ALL_TRANSLATIONS } from './select-all.token';

@NgModule({
	declarations: [
		LuTreeOptionSelectAllComponent,
	],
	exports: [
		LuTreeOptionSelectAllComponent,
	],
	providers: [
		{ provide: LU_TREE_OPTION_SELECT_ALL_TRANSLATIONS, useValue: luTreeOptionSelectAllTranslations },
		LuTreeOptionSelectAllIntl,
	]
})
export class LuTreeOptionSelectAllModule {}
