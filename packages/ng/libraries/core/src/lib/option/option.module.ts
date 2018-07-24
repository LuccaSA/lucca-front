import { NgModule } from '@angular/core';
import { LuOptionComponent } from './option.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuOptionComponent,
	],
	exports: [
		LuOptionComponent,
	],
})
export class LuOptionModule {}
