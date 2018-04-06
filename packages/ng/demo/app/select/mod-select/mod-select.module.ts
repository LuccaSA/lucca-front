import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicModSelectComponent } from './basic/basic';
import { DemoModSelectComponent } from './mod-select.component';
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
	declarations: [BasicModSelectComponent, DemoModSelectComponent],
	exports: [BasicModSelectComponent, DemoModSelectComponent],
})
export class DemoModSelectModule {}
