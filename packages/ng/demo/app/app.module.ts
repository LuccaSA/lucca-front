import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { DemoLolModule } from './lol/lol.module';
import {DemoDateRangePickerModule} from './date-range-picker/date-range-picker.module';
import {DemoUserTileModule} from './user-tile/user-tile.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		DemoLolModule,
		DemoDateRangePickerModule,
		DemoUserTileModule,
		BrowserModule,
		FormsModule,
		HttpModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
