import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

const routes = [
	{ path: 'all', loadChildren: () => import('./all').then(m => m.AllModule)},
	{ path: 'core', loadChildren: () => import('./core').then(m => m.CoreModule)},
	{ path: 'overlay', loadChildren: () => import('./overlay').then(m => m.OverlayModule)},
	{ path: 'primary', loadChildren: () => import('./primary').then(m => m.PrimaryModule)},
];

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
