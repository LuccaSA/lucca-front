import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
	selector: 'demo-lol',
	templateUrl: './lol.component.html',
	styles: []
})
export class DemoLolComponent implements OnInit {

	constructor() { }

	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic.component'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.component.html')
		},
	}
	ngOnInit() {
	}
}
