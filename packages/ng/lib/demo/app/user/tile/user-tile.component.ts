import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
	selector: 'demo-user-tile',
	templateUrl: './user-tile.component.html',
	styles: [],
})
export class DemoUserTileComponent implements OnInit {
	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic.component'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.component.html'),
		},
		displayformat: {
			code: require('!!prismjs-loader?lang=typescript!./displayFormat/display-format.component'),
			markup: require('!!prismjs-loader?lang=markup!./displayFormat/display-format.component.html'),
		},
		sizes: {
			code: require('!!prismjs-loader?lang=typescript!./sizes/sizes.component'),
			markup: require('!!prismjs-loader?lang=markup!./sizes/sizes.component.html'),
		},
	};
	constructor() {}
	ngOnInit() {}
}
