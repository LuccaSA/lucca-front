import {
	Component,
	OnInit,
	ChangeDetectionStrategy
} from '@angular/core';
declare var require: any;

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'demo-option-picker',
	templateUrl: './option-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class DemoOptionPickerComponent implements OnInit {
	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html'),
		},
		operator: {
			code: require('!!prismjs-loader?lang=typescript!./operator/operator'),
			markup: require('!!prismjs-loader?lang=markup!./operator/operator.html'),
		},
		custom: {
			code: require('!!prismjs-loader?lang=typescript!./custom/custom'),
			markup: require('!!prismjs-loader?lang=markup!./custom/custom.html'),
		},
	};
	constructor() {}
	ngOnInit() {}
}
