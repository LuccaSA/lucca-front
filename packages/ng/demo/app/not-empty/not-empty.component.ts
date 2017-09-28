import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
	selector: 'demo-not-empty',
	templateUrl: './not-empty.component.html',
	styles: []
})
export class DemoNotEmptyComponent implements OnInit {

	constructor() { }

	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html')
		},
		custom: {
			code: require('!!prismjs-loader?lang=typescript!./custom-fn/custom-fn'),
			markup: require('!!prismjs-loader?lang=markup!./custom-fn/custom-fn.html')
		},
		// fieldgroup: {
		// 	code: require('!!prismjs-loader?lang=typescript!./fieldgroup/fieldgroup'),
		// 	markup: require('!!prismjs-loader?lang=markup!./fieldgroup/fieldgroup.html')
		// },
		// validation: {
		// 	code: require('!!prismjs-loader?lang=typescript!./validation/validation'),
		// 	markup: require('!!prismjs-loader?lang=markup!./validation/validation.html')
		// },
	};

	ngOnInit() {
	}

}
