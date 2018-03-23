import { Component } from '@angular/core';
declare var require: any;
@Component({
	selector: 'demo-api-select',
	templateUrl: './api-select.component.html',
})
export class DemoApiSelectComponent {
	snippets = {
		api: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html')
		},
		picker: {
			code: require('!!prismjs-loader?lang=typescript!./basic/api-select-feeder')
		},
	};

}
