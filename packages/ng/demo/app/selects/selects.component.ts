import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
	selector: 'demo-selects',
	templateUrl: './selects.component.html',
	styles: []
})
export class DemoSelectsComponent implements OnInit {
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
