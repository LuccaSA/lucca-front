import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from 'ng-formly';
import { LU_FORMLY_COMPONENTS, LU_FORMLY_CONFIG } from './formly.config';
import { LuNotEmptyModule } from '../not-empty/not-empty.module';

@NgModule({
	declarations: [
		...LU_FORMLY_COMPONENTS,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		LuNotEmptyModule,

		FormlyModule.forChild(LU_FORMLY_CONFIG),
	],
})
export class LuFormlyModule {}
