import { Component, OnInit, AfterViewInit } from '@angular/core';
import {DemoApiSelectFeeder} from './api-select-feeder';

@Component({
	selector: 'basic-api-select',
	templateUrl: './basic.html',
})
export class BasicApiSelectComponent {

	constructor(
		public apiSelectFeeder: DemoApiSelectFeeder) {
	}

}
