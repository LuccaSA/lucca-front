import { NgModule } from '@angular/core';
import { LuUserPagedSearcherComponent } from './user-searcher.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LuOptionPlaceholderModule } from '@lucca-front/ng/option';
import { LuUserSearcherIntl } from './user-searcher.intl';
import { LU_USER_SEARCHER_TRANSLATIONS } from './user-searcher.token';
import { luUserSearcherTranslations } from './user-searcher.translate';

@NgModule({
	imports: [
		HttpClientModule,
		ReactiveFormsModule,
		CommonModule,
		LuOptionPlaceholderModule,
	],
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
