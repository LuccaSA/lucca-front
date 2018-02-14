import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuSelectSearcherComponent } from './select-searcher.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuSelectSearcherComponent,
	],
	exports: [
		LuSelectSearcherComponent,
	]
})
export class LuSelectSearcherModule { }

