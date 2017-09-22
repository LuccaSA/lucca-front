import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
	selector: 'demo-user-tile',
	templateUrl: './user-tile.component.html',
	styles: []
})
export class DemoUserTileComponent implements OnInit {

	constructor() { }

	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic.component'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.component.html')
		},
	};

	ngOnInit() {
	}

}
