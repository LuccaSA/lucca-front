import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { LuEmptyModule } from '../../../../src/app/empty/empty.module';
import { LuApiModule } from '../../../../src/app/api/api.module';

import { DemoApiPickerComponent } from './api-picker.component';
import { SharedModule } from '../../shared';

import { BasicComponent } from './basic/basic';
import { NopickerComponent } from './nopicker/nopicker';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		SharedModule,
		LuEmptyModule,
		LuApiModule,
	],
	declarations: [
		DemoApiPickerComponent,
		NopickerComponent,
		BasicComponent,
	],
	exports: [
		DemoApiPickerComponent,
	]
})
export class DemoApiPickerModule { }
