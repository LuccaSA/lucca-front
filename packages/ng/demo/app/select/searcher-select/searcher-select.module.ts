import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuSelectModule, LuSelectSearchIntl } from '../../../../src/app/select';
import { SharedModule } from '../../shared/index';
import { BasicSearcherSelectComponent } from './basic/basic';
import { DemoSearcherSelectComponent } from './searcher-select.component';
import { getOverrideLuSelectSearchIntl } from './searcher-select-demo.intl';


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
		BasicSearcherSelectComponent,
		DemoSearcherSelectComponent,
	],
	exports: [
		BasicSearcherSelectComponent,
		DemoSearcherSelectComponent,
	],
	providers: [{ provide: LuSelectSearchIntl, useValue: getOverrideLuSelectSearchIntl() }]
})
export class DemoSearcherSelectModule { }
