import { Component, ChangeDetectionStrategy } from '@angular/core';
declare var require: any;
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'demo-searcher-select',
	templateUrl: './searcher.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoSearcherSelectComponent {
	snippets = {
		searcher: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html'),
		},
	};
}
