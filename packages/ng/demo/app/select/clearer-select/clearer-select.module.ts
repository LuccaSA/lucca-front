import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicClearerSelectComponent } from './basic/basic';
import { DemoClearerSelectComponent } from './clearer-select.component';
import { LuSelectModule } from '../../../../src/app/select';
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
		BasicClearerSelectComponent,
		DemoClearerSelectComponent,
	],
	exports: [
		BasicClearerSelectComponent,
		DemoClearerSelectComponent,
	],
})
export class DemoClearerSelectModule { }
