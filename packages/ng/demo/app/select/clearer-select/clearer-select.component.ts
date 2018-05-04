import { Component, ChangeDetectionStrategy } from '@angular/core';
declare var require: any;
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'demo-clearer-select',
	templateUrl: './clearer-select.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoClearerSelectComponent {
	snippets = {
		clearer: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html'),
		},
	};
}
