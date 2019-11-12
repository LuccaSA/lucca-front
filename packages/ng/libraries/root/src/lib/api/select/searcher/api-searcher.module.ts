import { NgModule } from '@angular/core';
import { LuApiSearcherComponent, LuApiPagedSearcherComponent } from './api-searcher.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		HttpClientModule,
		ReactiveFormsModule,
		CommonModule,
	],
	declarations: [
		LuApiSearcherComponent,
		LuApiPagedSearcherComponent,
	],
	exports: [
		LuApiSearcherComponent,
		LuApiPagedSearcherComponent,
	],
})
export class LuApiSearcherModule {}
