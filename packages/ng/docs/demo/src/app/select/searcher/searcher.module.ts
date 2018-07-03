import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuSelectModule, LuSelectSearchIntl } from '@lucca-front/ng';
import { SharedModule } from '../../shared/index';
import { BasicSearcherSelectComponent } from './basic/basic';
import { DemoSearcherSelectComponent } from './searcher';
import { getOverrideLuSelectSearchIntl } from './searcher-demo.intl';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		LuSelectModule,
		SharedModule,
	],
	declarations: [BasicSearcherSelectComponent, DemoSearcherSelectComponent],
	exports: [BasicSearcherSelectComponent, DemoSearcherSelectComponent],
	providers: [
		{ provide: LuSelectSearchIntl, useValue: getOverrideLuSelectSearchIntl() },
	],
})
export class DemoSearcherSelectModule {}
