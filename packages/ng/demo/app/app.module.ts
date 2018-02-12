import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

// router
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.router';

import { DemoDateRangePickerModule } from './date-range-picker/date-range-picker.module';
import { DemoFormlyModule } from './formly/formly.module';
import { DemoEmptyModule } from './empty/empty.module';
import { DemoPopoverModule } from './popover/popover.module';
import { DemoAnimationsModule } from './animations/animations.module';
import { DemoApiModule } from './api/api.module';
import { DemoSelectModule } from './select/select.module';

import { DemoUserModule } from './user/user.module';

@NgModule({
	declarations: [
		AppComponent,
		NavigationComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forRoot(appRoutes),

		DemoAnimationsModule,
		DemoPopoverModule,
		DemoDateRangePickerModule,
		DemoUserModule,
		DemoFormlyModule,
		DemoEmptyModule,
		DemoApiModule,
		DemoSelectModule,

		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
