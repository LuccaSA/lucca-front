import { NgModule } from '@angular/core';
import { LuTreeOptionSearcherComponent } from './tree-option-searcher.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		ReactiveFormsModule,
	],
	declarations: [
		LuTreeOptionSearcherComponent,
	],
	exports: [
		LuTreeOptionSearcherComponent,
	],
})
export class LuTreeOptionSearcherModule {}
