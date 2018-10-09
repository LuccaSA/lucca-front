import {
	Component,
	OnInit,
	ChangeDetectionStrategy
} from '@angular/core';
declare var require: any;

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'demo-select-foundations',
	templateUrl: './select-foundations.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class DemoSelectFoundationsComponent implements OnInit {
	snippets = {
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.html'),
		},
		displayer: {
			code: require('!!prismjs-loader?lang=typescript!./displayer/displayer'),
			markup: require('!!prismjs-loader?lang=markup!./displayer/displayer.html'),
		},
		clearer: {
			code: require('!!prismjs-loader?lang=typescript!./clearer/clearer'),
			markup: require('!!prismjs-loader?lang=markup!./clearer/clearer.html'),
		},
		multiple: {
			code: require('!!prismjs-loader?lang=typescript!./multiple/multiple'),
			markup: require('!!prismjs-loader?lang=markup!./multiple/multiple.html'),
		},
	};
	constructor() {}
	ngOnInit() {}
}
