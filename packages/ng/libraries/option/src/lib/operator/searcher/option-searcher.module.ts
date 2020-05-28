import { NgModule } from '@angular/core';
import { LuOptionSearcherComponent } from './option-searcher.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
})
export class LuOptionSearcherModule {}
