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
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html'),
		},
		feeder: {
			code: require('!!prismjs-loader?lang=typescript!./feeder/feeder'),
			markup: require('!!prismjs-loader?lang=markup!./feeder/feeder.html'),
		},
		pager: {
			code: require('!!prismjs-loader?lang=typescript!./pager/pager'),
			markup: require('!!prismjs-loader?lang=markup!./pager/pager.html'),
		},
		searcher: {
			code: require('!!prismjs-loader?lang=typescript!./searcher/searcher'),
			markup: require('!!prismjs-loader?lang=markup!./searcher/searcher.html'),
		},
	};

	constructor() {}

	ngOnInit() {}
}
