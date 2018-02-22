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
		fieldgroup: {
			code: require('!!prismjs-loader?lang=typescript!./fieldgroup/fieldgroup'),
			markup: require('!!prismjs-loader?lang=markup!./fieldgroup/fieldgroup.html')
		},
		validation: {
			code: require('!!prismjs-loader?lang=typescript!./validation/validation'),
			markup: require('!!prismjs-loader?lang=markup!./validation/validation.html')
		},
		change: {
			code: require('!!prismjs-loader?lang=typescript!./change/change'),
			markup: require('!!prismjs-loader?lang=markup!./change/change.html')
		},
		option: {
			code: require('!!prismjs-loader?lang=typescript!./option/option'),
			markup: require('!!prismjs-loader?lang=markup!./option/option.html')
		},
	};

	ngOnInit() {
	}

}
