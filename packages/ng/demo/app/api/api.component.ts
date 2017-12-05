import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var require: any;

@Component({
	selector: 'demo-api',
	templateUrl: './api.component.html',
	styles: []
})
export class DemoApiComponent implements OnInit {
	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html')
		},
		nopicker: {
			code: require('!!prismjs-loader?lang=typescript!./nopicker/nopicker'),
			markup: require('!!prismjs-loader?lang=markup!./nopicker/nopicker.html')
		},
	};
	constructor(private http: HttpClient) { }
	ngOnInit() {
	}
}
