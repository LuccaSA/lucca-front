import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from 'ng-formly';
import { MdAutocompleteModule, MdInputModule, MdOptionModule } from '@angular/material';
import { LU_FORMLY_COMPONENTS, LU_FORMLY_CONFIG } from './formly.config';
import { LuEmptyModule } from '../empty/empty.module';

@NgModule({
	declarations: [
		...LU_FORMLY_COMPONENTS,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MdAutocompleteModule,
		MdInputModule,
		MdOptionModule,

		LuEmptyModule,

		FormlyModule.forChild(LU_FORMLY_CONFIG),
	],
})
export class LuFormlyModule {}
