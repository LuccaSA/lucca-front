import { NgModule } from '@angular/core';
import { LuUserPagedSearcherComponent } from './user-searcher.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LuUserDisplayModule } from '../../display/index';
import { LuOptionModule } from '@lucca-front/ng/option';

@NgModule({
	imports: [
		HttpClientModule,
		ReactiveFormsModule,
		CommonModule,
		LuUserDisplayModule,
		LuOptionModule,
	],
	declarations: [
		LuUserPagedSearcherComponent,
	],
	exports: [
		LuUserPagedSearcherComponent,
	],
})
export class LuUserSearcherModule {}
