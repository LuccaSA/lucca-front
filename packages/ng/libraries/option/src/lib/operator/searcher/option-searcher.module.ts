import { NgModule } from '@angular/core';
import { LuOptionSearcherComponent } from './option-searcher.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LuOptionSearcherIntl} from './option-searcher.intl';
import { LU_OPTION_SEARCHER_TRANSLATIONS } from './option-searcher.token';
import { luOptionSearcherTranslations } from './option-searcher.translate';

@NgModule({
	imports: [
		ReactiveFormsModule,
		CommonModule,
	],
	declarations: [
		LuOptionSearcherComponent,
	],
	exports: [
		LuOptionSearcherComponent,
	],
	providers: [
		LuOptionSearcherIntl,
		{ provide: LU_OPTION_SEARCHER_TRANSLATIONS, useValue: luOptionSearcherTranslations },
	]
})
export class LuOptionSearcherModule {}
