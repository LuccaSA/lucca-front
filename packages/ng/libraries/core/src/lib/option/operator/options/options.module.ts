import { NgModule } from '@angular/core';
import { LuOptionsComponent } from './options.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		LuOptionsComponent,
	],
	exports: [
		LuOptionsComponent,
	],
})
export class LuOptionsModule {}
