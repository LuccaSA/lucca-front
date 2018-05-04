import { Component, ChangeDetectionStrategy } from '@angular/core';
declare var require: any;
@Component({
	selector: 'demo-api-select',
	templateUrl: './api-select.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoApiSelectComponent {
	snippets = {
		api: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html'),
		},
		picker: {
			code: require('!!prismjs-loader?lang=typescript!./basic/rdd-select-feeder'),
		},
		custom: {
			code: require('!!prismjs-loader?lang=typescript!./custom/custom'),
			markup: require('!!prismjs-loader?lang=markup!./custom/custom.html'),
		},
		customfeeder: {
			code: require('!!prismjs-loader?lang=typescript!./custom/custom-select-feeder'),
		},
	};
}
