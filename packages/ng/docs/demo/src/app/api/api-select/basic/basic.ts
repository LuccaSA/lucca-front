import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { DemoApiSelectFeeder } from './rdd-select-feeder';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'basic-api-select',
	templateUrl: './basic.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicApiSelectComponent {
	api = '/api/v3/axissections';
	params = ['axisId=5'];

	itemSelect: any;
	constructor(public apiSelectFeeder: DemoApiSelectFeeder) {}
}
