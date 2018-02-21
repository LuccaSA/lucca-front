import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuSelectSearcherComponent } from './select-searcher.component';
import { LU_SELECT_SEARCH_INTL_PROVIDER } from './select-searcher-intl';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuSelectSearcherComponent,
	],
	exports: [
		LuSelectSearcherComponent,
	],
	providers: [LU_SELECT_SEARCH_INTL_PROVIDER]
})
export class LuSelectSearcherModule { }

