import { NgModule } from '@angular/core';
import { LuOptionPlaceholderComponent } from './option-placeholder.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuOptionPlaceholderComponent,
	],
	exports: [
		LuOptionPlaceholderComponent,
	],
})
export class LuOptionPlaceholderModule {}
