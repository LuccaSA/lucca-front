import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicFeederSelectComponent } from './basic/basic';
import { DemoSelectFeederPickerComponent } from './basic/feeder-select-picker';
import { DemoFeederSelectComponent } from './feeder';
import { LuSelectModule } from '@core';
import { SharedModule } from '../../shared/index';

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
		BasicFeederSelectComponent,
		DemoFeederSelectComponent,
		DemoSelectFeederPickerComponent,
	],
	exports: [
		BasicFeederSelectComponent,
		DemoFeederSelectComponent,
		DemoSelectFeederPickerComponent,
	],
})
export class DemoFeederSelectModule {}
