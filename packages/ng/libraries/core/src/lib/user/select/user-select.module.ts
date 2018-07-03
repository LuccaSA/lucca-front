import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuSelectModule, LuSelectIntl } from '../../select/index';
// import { getOverrideLuSelectIntl } from './user-select.int';
import { luUserSelectIntl } from './user-select.int';
import { LuUserSelect } from './user-select.component';
import { LuUserSelectApiFeeder } from './user-select-api-feeder';
import { HttpClientModule } from '@angular/common/http';
import { LuApiSelectModule } from '../../api/index';

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
	providers: [
		{ provide: LuUserSelectApiFeeder, useClass: LuUserSelectApiFeeder },
		{ provide: LuSelectIntl, useValue: luUserSelectIntl },
	],
})
export class LuUserSelectModule {}
