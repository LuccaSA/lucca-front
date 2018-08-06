import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
declare var require: any;

@Component({
	selector: 'demo-api-select',
	templateUrl: './api-select.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class DemoApiSelectComponent implements OnInit {
	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./feeder/feeder'),
			markup: require('!!prismjs-loader?lang=markup!./feeder/feeder.html'),
		},
	};

	constructor() {}

	ngOnInit() {}
}
