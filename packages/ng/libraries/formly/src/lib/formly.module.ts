import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import {
	MatInputModule,
	MatDatepickerModule,
} from '@angular/material';
import { LU_FORMLY_COMPONENTS, LU_FORMLY_CONFIG } from './formly.config';
import {
	LuSelectModule,
	LuInputModule,
	LuUserSelectModule,
	LuOptionModule,
	LuSelectClearerModule,
	LuApiSelectModule
} from '@lucca-front/ng';

@NgModule({
	declarations: [...LU_FORMLY_COMPONENTS],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatDatepickerModule,

		LuSelectModule,
		LuOptionModule,
		LuSelectClearerModule,
		LuUserSelectModule,
		LuInputModule,
		LuApiSelectModule,

		FormlyModule.forChild(LU_FORMLY_CONFIG),
	],
})
export class LuFormlyModule {}
