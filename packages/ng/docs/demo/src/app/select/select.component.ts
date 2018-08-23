import {
	Component,
	OnInit,
	ChangeDetectionStrategy
} from '@angular/core';
declare var require: any;

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'demo-select',
	templateUrl: './select.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class DemoSelectComponent implements OnInit {
	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html'),
		},
		multiple: {
			code: require('!!prismjs-loader?lang=typescript!./multiple/multiple'),
			markup: require('!!prismjs-loader?lang=markup!./multiple/multiple.html'),
		},
	};
	constructor() {}
	ngOnInit() {}
}
