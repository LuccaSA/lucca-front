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
		debug: {
			code: require('!!prismjs-loader?lang=typescript!./debug/debug'),
			markup: require('!!prismjs-loader?lang=markup!./debug/debug.html')
		},
	};

	ngOnInit() {
	}

}
