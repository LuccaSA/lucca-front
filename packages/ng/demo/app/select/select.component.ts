import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'demo-select',
	templateUrl: './select.component.html',
	styles: []
})
export class DemoSelectComponent implements OnInit {
	snippets = {
		simple: {
			code: require('!!prismjs-loader?lang=typescript!./simple-select/simple-select.component'),
			markup: require('!!prismjs-loader?lang=markup!./simple-select/simple-select.component.html')
		},
	};
	constructor() { }
	ngOnInit() {
	}
}
