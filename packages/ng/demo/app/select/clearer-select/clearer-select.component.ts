import { Component } from '@angular/core';
declare var require: any;
@Component({
	selector: 'demo-clearer-select',
	templateUrl: './clearer-select.component.html',
})
export class DemoClearerSelectComponent {
	snippets = {
		clearer: {
			code: require('!!prismjs-loader?lang=typescript!./clearer-select.component'),
			markup: require('!!prismjs-loader?lang=markup!./clearer-select.component.html')
		},
	};

}
