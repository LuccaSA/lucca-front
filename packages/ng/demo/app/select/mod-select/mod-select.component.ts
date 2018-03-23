import { Component } from '@angular/core';
declare var require: any;
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'demo-mod-select',
	templateUrl: './mod-select.component.html',
})
export class DemoModSelectComponent {
	snippets = {
		mod: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html')
		},
	};
}
