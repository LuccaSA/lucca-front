import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Fix472Component } from './fix-472.component';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuInputDisplayerModule } from '@lucca-front/ng/input';
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
