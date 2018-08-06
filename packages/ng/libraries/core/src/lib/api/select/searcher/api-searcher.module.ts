import { NgModule } from '@angular/core';
import { LuApiSearcherComponent } from './api-searcher.component';
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
	],
	exports: [
		LuApiSearcherComponent,
	],
})
export class LuApiSearcherModule {}
