import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SharedModule } from './components/shared'
// import { BogusComponent } from '../../src/';
import { BogusModule } from '../../src/';

import { DemoBogusModule } from './components';
import { DemoLolModule } from './lol/lol.module';

@NgModule({
	declarations: [
		AppComponent,
		// BogusComponent,
	],
	imports: [
		// BogusModule,
		DemoBogusModule,
		DemoLolModule,
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
