import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
	selector: 'demo-formly',
	templateUrl: './formly.component.html',
	styles: []
})
export class DemoFormlyComponent implements OnInit {

	constructor() { }

	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html')
		},
		debug: {
			code: require('!!prismjs-loader?lang=typescript!./debug/debug'),
			markup: require('!!prismjs-loader?lang=markup!./debug/debug.html')
		},
		fieldgroup: {
			code: require('!!prismjs-loader?lang=typescript!./fieldgroup/fieldgroup'),
			markup: require('!!prismjs-loader?lang=markup!./fieldgroup/fieldgroup.html')
		},
	};

	ngOnInit() {
	}

}
