import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
	selector: 'demo-date-range-picker',
	templateUrl: './date-range-picker.component.html',
	styles: [],
})
export class DemoDateRangePickerComponent implements OnInit {
	constructor() {}

	snippets = {
		// basic: {
		// 	code: require('!!prismjs-loader?lang=typescript!./basic/basic.component'),
		// 	markup: require('!!prismjs-loader?lang=markup!./basic/basic.component.html')
		// },
	};

	ngOnInit() {}
}
