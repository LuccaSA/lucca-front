import { NgModule } from '@angular/core';
import { LuTreeOptionSearcherComponent } from './tree-option-searcher.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		ReactiveFormsModule,
		CommonModule,
	],
	declarations: [
		LuTreeOptionSearcherComponent,
	],
	exports: [
		LuTreeOptionSearcherComponent,
	],
})
export class LuTreeOptionSearcherModule {}
