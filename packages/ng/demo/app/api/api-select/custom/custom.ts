import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { DemoCustomApiSelectFeeder } from './custom-select-feeder';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'custom-api-select',
	templateUrl: './custom.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomApiSelectComponent {
	itemSelect: any;
	constructor(public apiSelectFeeder: DemoCustomApiSelectFeeder) {}
}
