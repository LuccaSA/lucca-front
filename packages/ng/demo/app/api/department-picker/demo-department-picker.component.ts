import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
	selector: 'demo-department-picker',
	templateUrl: './demo-department-picker.component.html',
	styles: []
})
export class DemoDepartmentPickerComponent implements OnInit {

	public snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html')
		},
	};

	constructor() { }

	ngOnInit() {
	}

}
