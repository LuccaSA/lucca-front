import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
	<ul>
		<li><a routerLink="/all">all</a>
		<li><a routerLink="/core">core</a>
		<li><a routerLink="/overlay">overlay</a>
		<li><a routerLink="/primary">primary</a>
	</ul>
	<router-outlet></router-outlet>
	`,
	styles: []
})
export class AppComponent {}
