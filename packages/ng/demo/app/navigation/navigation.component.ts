import { Component, OnInit } from '@angular/core';
import { featuresRoutes } from './navigation.router';
@Component({
	selector: 'demo-navigation',
	templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {

	features = [ ...featuresRoutes ];

	constructor() { }

	ngOnInit() {
	}
}
