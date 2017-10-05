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
import { DemoDateRangePickerModule } from './date-range-picker/date-range-picker.module';
import { DemoUserTileModule } from './user-tile/user-tile.module';
import { DemoUserDisplayModule } from './user-display/user-display.module';
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';

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
		DemoUserDisplayModule,
		BrowserModule,
		FormsModule,
		HttpModule,
	],
	providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
	bootstrap: [AppComponent]
})
export class AppModule { }
