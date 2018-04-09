import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import {
	MatAutocompleteModule,
	MatInputModule,
	MatOptionModule,
	MatSelectModule,
	MatDatepickerModule,
} from '@angular/material';
import { LU_FORMLY_COMPONENTS, LU_FORMLY_CONFIG } from './formly.config';
import { LuEmptyModule } from '../empty/empty.module';
import { LuSelectModule, LuSelectOptionModule, LuSelectClearerModule } from '../select';

@NgModule({
	declarations: [...LU_FORMLY_COMPONENTS],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatInputModule,
		MatOptionModule,
		MatSelectModule,
		MatDatepickerModule,

		LuEmptyModule,
		LuSelectModule,
		LuSelectOptionModule,
		LuSelectClearerModule,

		FormlyModule.forChild(LU_FORMLY_CONFIG),
	],
})
export class LuFormlyModule {}
