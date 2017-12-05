import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuUserDisplayPipe } from './user-display.pipe';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuUserDisplayPipe,
	],
	exports: [
		LuUserDisplayPipe,
	],
	providers: [
		LuUserDisplayPipe,
	],
})
export class LuUserDisplayModule { }
