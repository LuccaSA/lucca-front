import { BogusComponent } from '../bogus';
import { LuLolModule } from './lol/lol.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [
		CommonModule,
		LuLolModule,
	],
	declarations: [
		BogusComponent
	]
})
export class LuRootModule { }
