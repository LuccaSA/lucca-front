import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { featuresRoutes } from './navigation.router';
@Component({
	selector: 'demo-navigation',
	templateUrl: './navigation.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
	features = [...featuresRoutes];

	constructor() {}

	ngOnInit() {}
}
