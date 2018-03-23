import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuSelectModule } from '../../../../src/app/select';
import { SharedModule } from '../../shared/index';
import { BasicApiSelectComponent } from './basic/basic';
import { DemoApiSelectFeeder } from './basic/api-select-feeder';
import { CustomApiSelectComponent } from './custom/custom';
import { DemoCustomApiSelectFeeder } from './custom/custom-select-feeder';
import { DemoApiSelectComponent } from './api-select.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		LuSelectModule,
		SharedModule,
	],
	declarations: [
		BasicApiSelectComponent,
		CustomApiSelectComponent,
		DemoApiSelectComponent,
	],
	exports: [
		BasicApiSelectComponent,
		CustomApiSelectComponent,
		DemoApiSelectComponent,
	],
	providers: [
		{ provide: DemoApiSelectFeeder, useClass: DemoApiSelectFeeder },
		{ provide: DemoCustomApiSelectFeeder, useClass: DemoCustomApiSelectFeeder },
	]
})
export class DemoApiSelectModule { }
