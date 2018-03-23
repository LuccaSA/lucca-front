import { Component, OnInit, AfterViewInit } from '@angular/core';
import {DemoCustomApiSelectFeeder} from './custom-select-feeder';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'custom-api-select',
	templateUrl: './custom.html',
})
export class CustomApiSelectComponent {

	constructor(
		public apiSelectFeeder: DemoCustomApiSelectFeeder) {
	}

}
