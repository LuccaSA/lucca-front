import { Component, OnInit } from '@angular/core';

declare var require: any;

@Component({
	selector: 'demo-lu-popover',
	templateUrl: './lu-popover.component.html',
	styles: []
})
export class DemoPopoverComponent implements OnInit {

	constructor() { }

	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic.component'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.component.html')
		}
	}

	ngOnInit() {
	}

}
