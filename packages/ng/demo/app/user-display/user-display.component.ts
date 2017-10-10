import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
	selector: 'demo-user-display',
	templateUrl: './user-display.component.html',
	styles: []
})
export class DemoUserDisplayComponent implements OnInit {
	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic.component'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.component.html')
		},
	};

	constructor() { }

	ngOnInit() {
	}

}
