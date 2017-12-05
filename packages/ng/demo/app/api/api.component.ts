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
		// basic: {
		// 	code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
		// 	markup: require('!!prismjs-loader?lang=markup!./basic/basic.html')
		// },
		// custom: {
		// 	code: require('!!prismjs-loader?lang=typescript!./custom-fn/custom-fn'),
		// 	markup: require('!!prismjs-loader?lang=markup!./custom-fn/custom-fn.html')
		// },
		// fieldgroup: {
		// 	code: require('!!prismjs-loader?lang=typescript!./fieldgroup/fieldgroup'),
		// 	markup: require('!!prismjs-loader?lang=markup!./fieldgroup/fieldgroup.html')
		// },
		// validation: {
		// 	code: require('!!prismjs-loader?lang=typescript!./validation/validation'),
		// 	markup: require('!!prismjs-loader?lang=markup!./validation/validation.html')
		// },
	};
	me;
	constructor(private http: HttpClient) { }


	whoami() {
		this.http.get<any>('/api/v3/users/me?fields=id,firstname,lastname')
		.subscribe(r => {
			this.me = r.data;
		})
	}



	ngOnInit() {
	}

}
