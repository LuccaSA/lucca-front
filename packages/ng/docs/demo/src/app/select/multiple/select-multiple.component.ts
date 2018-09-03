import {
	Component,
	ChangeDetectionStrategy
} from '@angular/core';
declare var require: any;

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'demo-select-multiple',
	templateUrl: './select-multiple.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [],
})
export class DemoSelectMultipleComponent {
	// snippets = {
	// 	basic: {
	// 		code: require('!!prismjs-loader?lang=typescript!./basic/basic'),
	// 		markup: require('!!prismjs-loader?lang=markup!./basic/basic.html'),
	// 	},
	// };
	constructor() {}
}
