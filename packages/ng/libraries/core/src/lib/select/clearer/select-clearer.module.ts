import { NgModule } from '@angular/core';
import { LuSelectClearerComponent } from './select-clearer.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuSelectClearerComponent,
	],
	exports: [
		LuSelectClearerComponent,
	],
})
export class LuSelectClearerModule {}
