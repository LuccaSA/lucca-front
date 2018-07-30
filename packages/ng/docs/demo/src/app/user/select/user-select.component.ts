import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
declare var require: any;

@Component({
	selector: 'demo-user-select',
	templateUrl: './user-select.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class DemoUserSelectComponent implements OnInit {
	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html'),
		},
	};

	constructor() {}

	ngOnInit() {}
}
