import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuSelectClearerComponent } from './select-clearer.component';
import { LuSelectClearerFirstOrDefaultComponent } from './select-clearer-first.component';

@NgModule({
	imports: [CommonModule],
	declarations: [
		LuSelectClearerComponent,
		LuSelectClearerFirstOrDefaultComponent,
	],
	exports: [LuSelectClearerFirstOrDefaultComponent, LuSelectClearerComponent],
})
export class LuSelectClearerModule {}
