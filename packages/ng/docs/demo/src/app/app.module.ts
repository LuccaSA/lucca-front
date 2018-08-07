import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

// router
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.router';

import { DemoFormlyModule } from './formly/formly.module';
import { DemoPopoverModule } from './popover/popover.module';
import { DemoAnimationsModule } from './animation/animation.module';
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
		BrowserModule,
		BrowserAnimationsModule,

		DemoAnimationsModule,
		DemoPopoverModule,
		DemoUserModule,
		DemoFormlyModule,
		DemoApiModule,
		DemoSelectModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
