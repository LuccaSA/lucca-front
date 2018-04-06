import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LuSelectSearcherComponent } from './select-searcher.component';
import { LU_SELECT_SEARCH_INTL_PROVIDER } from '../utils/select-searcher.intl';

@NgModule({
	imports: [CommonModule, FormsModule, BrowserModule],
	declarations: [LuSelectSearcherComponent],
	exports: [LuSelectSearcherComponent],
	providers: [LU_SELECT_SEARCH_INTL_PROVIDER],
})
export class LuSelectSearcherModule {}
