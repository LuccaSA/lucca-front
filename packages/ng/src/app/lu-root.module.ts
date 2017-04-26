import { CommonModule } from '@angular/common';
import { LuLolModule } from './lol/lol.module';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [
		CommonModule,
		LuLolModule,
	],
	exports: [
		LuLolModule
	]
})
export class LuRootModule {}
