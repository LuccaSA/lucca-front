import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
	selector: 'demo-user-select',
	templateUrl: './user-select-basic.component.html',
	styles: []
})
export class DemoUserSelectComponent implements OnInit {

	snippets = {
		userselect: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html')
		},


	};
	constructor() { }
	ngOnInit() {
	}

}
