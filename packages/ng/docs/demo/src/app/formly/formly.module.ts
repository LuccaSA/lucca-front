import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatAutocompleteModule,
	MatInputModule,
	MatOptionModule,
	MatSelectModule,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { DemoFormlyComponent } from './formly.component';
import { LuFormlyModule } from '@lucca-front/ng/formly';
import { SharedModule } from '../shared/index';

import { BasicComponent } from './basic/basic';
import { FieldgroupComponent } from './fieldgroup/fieldgroup';
import { ValidationComponent } from './validation/validation';
import { ChangeComponent } from './change/change';
import { OptionComponent } from './option/option';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		FormlyModule.forRoot(),
		LuFormlyModule,

		MatAutocompleteModule,
		MatInputModule,
		MatOptionModule,
		MatSelectModule,

		MatMomentDateModule, // we use moment here
	],
	declarations: [
		DemoFormlyComponent,
		BasicComponent,
		FieldgroupComponent,
		ValidationComponent,
		ChangeComponent,
		OptionComponent,
	],
	exports: [DemoFormlyComponent],
})
export class DemoFormlyModule {}
