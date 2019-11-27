import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Fix472Component } from './fix-472.component';
import { LuSelectModule, LuOptionModule, LuInputDisplayerModule } from '@lucca-front/ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';


@NgModule({
	declarations: [
		Fix472Component,
	],
	imports: [
		CommonModule,
		LuSelectModule,
		LuOptionModule,
		FormsModule,
		LuInputDisplayerModule,
		TextFieldModule,
		RouterModule.forChild([
			{ path: '', component: Fix472Component },
		]),
	],
})
export class Fix472Module {}
