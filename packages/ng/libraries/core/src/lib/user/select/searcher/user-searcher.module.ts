import { NgModule } from '@angular/core';
import { LuUserPagedSearcherComponent } from './user-searcher.component';
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
		LuUserPagedSearcherComponent,
	],
	exports: [
		LuUserPagedSearcherComponent,
	],
})
export class LuUserSearcherModule {}
