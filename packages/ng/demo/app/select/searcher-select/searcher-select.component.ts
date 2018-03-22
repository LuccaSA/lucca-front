import { Component } from '@angular/core';
declare var require: any;
@Component({
	selector: 'demo-searcher-select',
	templateUrl: './searcher-select.component.html',
})
export class DemoSearcherSelectComponent {
	snippets = {
		searcher: {
			code: require('!!prismjs-loader?lang=typescript!./searcher-select.component'),
			markup: require('!!prismjs-loader?lang=markup!./searcher-select.component.html')
		},
	};
}
