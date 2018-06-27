import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LuRddFeederModule } from './select/index';

@NgModule({
	imports: [CommonModule, FormsModule, HttpClientModule, LuRddFeederModule],
	declarations: [],
	exports: [LuRddFeederModule],
})
export class LuRddModule {}
