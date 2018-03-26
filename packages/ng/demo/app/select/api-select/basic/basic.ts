import { Component, OnInit, AfterViewInit } from '@angular/core';
import {DemoApiSelectFeeder} from './api-select-feeder';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'basic-api-select',
	templateUrl: './basic.html',
})
export class BasicApiSelectComponent {

	itemSelect: any;
	constructor(
		public apiSelectFeeder: DemoApiSelectFeeder) {
	}

}
