import { Component, ChangeDetectionStrategy } from '@angular/core';
declare var require: any;

@Component({
	selector: 'demo-number',
	templateUrl: './number.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class DemoNumberComponent {
	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html'),
		},
		parameters: {
			code: require('!!prismjs-loader?lang=typescript!./parameters/parameters'),
			markup: require('!!prismjs-loader?lang=markup!./parameters/parameters.html'),
		},
	};
}
