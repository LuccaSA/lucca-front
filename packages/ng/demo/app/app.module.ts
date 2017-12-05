import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

// router
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.router';

import { DemoDateRangePickerModule } from './date-range-picker/date-range-picker.module';
import { DemoUserTileModule } from './user-tile/user-tile.module';
import { DemoUserDisplayModule } from './user-display/user-display.module';
import {DemoFormlyModule} from './formly/formly.module';
import {DemoEmptyModule} from './empty/empty.module';
import { DemoPopoverModule } from './lu-popover/lu-popover.module';
import { DemoAnimationsModule } from './animations/animations.module';
import { DemoApiModule } from './api/api.module';

@NgModule({
	declarations: [
		AppComponent,
		NavigationComponent,
	],
	imports: [
		RouterModule.forRoot(appRoutes),

		DemoAnimationsModule,
		DemoPopoverModule,
		DemoDateRangePickerModule,
		DemoUserTileModule,
		DemoUserDisplayModule,
		DemoFormlyModule,
		DemoEmptyModule,
		DemoApiModule,

		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
	],
	// providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
	bootstrap: [AppComponent]
})
export class AppModule { }
