import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
declare var require: any;
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'demo-feeder-select',
	templateUrl: './feeder-select.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoFeederSelectComponent {
	snippets = {
		feeder: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html'),
		},
		picker: {
			code: require('!!prismjs-loader?lang=typescript!./basic/feeder-select-picker.component'),
			markup: require('!!prismjs-loader?lang=markup!./basic/feeder-select-picker.component.html'),
		},
	};
}
