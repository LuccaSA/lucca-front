import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuSelectModule } from '../../select';
import { LuApiSelectModule } from '../../api/select';
import { LuUserSelect } from './user-select.component';
import { LuUserSelectApiFeeder } from './user-select-api-feeder';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		OverlayModule,
		HttpClientModule,
		LuSelectModule,
		LuApiSelectModule,
	],
	declarations: [LuUserSelect],
	exports: [LuUserSelect],
	providers: [{ provide: LuUserSelectApiFeeder, useClass: LuUserSelectApiFeeder }],
})
export class LuUserSelectModule {}
