import { NgModule } from '@angular/core';
import { LuDateInputDirective } from './date-input.directive';
import { LuDateAdapter } from './date.adapter';

@NgModule({
	imports: [
	],
	exports: [
		LuDateInputDirective,
	],
	declarations: [
		LuDateInputDirective,
	],
	providers: [
		LuDateAdapter,
	]
})
export class LuDateInputModule {}
