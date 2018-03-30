import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {LuSelectApiModule} from './select';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		LuSelectApiModule,
	],
	declarations: [
	],
	exports: [
		LuSelectApiModule,
	],
})
export class LuApiModule { }
