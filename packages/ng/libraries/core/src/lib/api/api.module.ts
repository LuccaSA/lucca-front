import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LuApiSelectModule } from './select';

@NgModule({
	imports: [CommonModule, FormsModule, HttpClientModule, LuApiSelectModule],
	declarations: [],
	exports: [LuApiSelectModule],
})
export class LuApiModule {}
