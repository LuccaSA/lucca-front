import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LuOptionPlaceholderModule } from '@lucca-front/ng/option';
import { LuUserPagedSearcherComponent } from './user-searcher.component';
import { LuUserSearcherIntl } from './user-searcher.intl';
import { LU_USER_SEARCHER_TRANSLATIONS } from './user-searcher.token';
import { luUserSearcherTranslations } from './user-searcher.translate';

@NgModule({
	imports: [ReactiveFormsModule, CommonModule, LuOptionPlaceholderModule],
	declarations: [LuUserPagedSearcherComponent],
	exports: [LuUserPagedSearcherComponent],
	providers: [
		LuUserSearcherIntl,
		{
			provide: LU_USER_SEARCHER_TRANSLATIONS,
			useValue: luUserSearcherTranslations,
		},
	],
})
export class LuUserSearcherModule {}
