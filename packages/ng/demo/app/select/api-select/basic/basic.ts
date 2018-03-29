import { Component, OnInit, AfterViewInit } from '@angular/core';
import {DemoApiSelectFeeder} from './api-select-feeder';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'basic-api-select',
	templateUrl: './basic.html',
})
export class BasicApiSelectComponent {
	api = '/api/v3/axissections';
	params = ['axisId=5'];

	itemSelect: any;
	constructor(
		public apiSelectFeeder: DemoApiSelectFeeder) {
	}


}
