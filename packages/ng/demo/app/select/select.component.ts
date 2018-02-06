import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
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
		mod: {
			code: require('!!prismjs-loader?lang=typescript!./mod-select/mod-select.component'),
			markup: require('!!prismjs-loader?lang=markup!./mod-select/mod-select.component.html')
		},
		clearer: {
			code: require('!!prismjs-loader?lang=typescript!./clearer-select/clearer-select.component'),
			markup: require('!!prismjs-loader?lang=markup!./clearer-select/clearer-select.component.html')
		},
	};
	constructor() { }
	ngOnInit() {
	}
}
