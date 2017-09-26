import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

// router
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.router';

import { DemoLolModule } from './lol/lol.module';
import {DemoDateRangePickerModule} from './date-range-picker/date-range-picker.module';
import {DemoUserTileModule} from './user-tile/user-tile.module';
import {DemoFormlyModule} from './formly/formly.module';

@NgModule({
	declarations: [
		AppComponent,
		NavigationComponent,
	],
	imports: [
		RouterModule.forRoot(appRoutes),

		DemoLolModule,
		DemoDateRangePickerModule,
		DemoUserTileModule,
		DemoFormlyModule,

		BrowserModule,
		FormsModule,
		HttpModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
