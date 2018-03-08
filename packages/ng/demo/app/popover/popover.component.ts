import { Component, OnInit } from '@angular/core';

declare var require: any;

@Component({
	selector: 'demo-popover',
	templateUrl: './popover.component.html',
	styles: []
})
export class DemoPopoverComponent implements OnInit {

	constructor() { }

	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html')
		},
		trigger: {
			code: require('!!prismjs-loader?lang=typescript!./trigger/trigger'),
			markup: require('!!prismjs-loader?lang=markup!./trigger/trigger.html')
		},
		scroll: {
			code: require('!!prismjs-loader?lang=typescript!./scroll/scroll'),
			markup: require('!!prismjs-loader?lang=markup!./scroll/scroll.html')
		}
	}

	ngOnInit() {
	}

}
