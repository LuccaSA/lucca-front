import { NgModule } from '@angular/core';
import { LuOptionSearcherComponent } from './option-searcher.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		ReactiveFormsModule,
	],
	declarations: [
		LuOptionSearcherComponent,
	],
	exports: [
		LuOptionSearcherComponent,
	],
})
export class LuOptionSearcherModule {}
