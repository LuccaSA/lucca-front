import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
	selector: 'demo-animations',
	templateUrl: './animations.component.html',
	styles: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoAnimationsComponent implements OnInit {
	constructor() {}

	snippets = {
		fading: {
			code: require('!!prismjs-loader?lang=typescript!./fading/fading.component'),
			markup: require('!!prismjs-loader?lang=markup!./fading/fading.component.html'),
		},
		sliding: {
			code: require('!!prismjs-loader?lang=typescript!./sliding/sliding.component'),
			markup: require('!!prismjs-loader?lang=markup!./sliding/sliding.component.html'),
		},
		scaling: {
			code: require('!!prismjs-loader?lang=typescript!./scaling/scaling.component'),
			markup: require('!!prismjs-loader?lang=markup!./scaling/scaling.component.html'),
		},
	};
	ngOnInit() {}
}
