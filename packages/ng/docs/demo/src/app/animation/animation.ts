import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
	selector: 'demo-animations',
	templateUrl: './animation.html',
	styles: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoAnimationComponent implements OnInit {
	snippets = {
		fading: {
			code: require('!!prismjs-loader?lang=typescript!./fading/fading'),
			markup: require('!!prismjs-loader?lang=markup!./fading/fading.html'),
		},
		sliding: {
			code: require('!!prismjs-loader?lang=typescript!./sliding/sliding'),
			markup: require('!!prismjs-loader?lang=markup!./sliding/sliding.html'),
		},
		scaling: {
			code: require('!!prismjs-loader?lang=typescript!./scaling/scaling'),
			markup: require('!!prismjs-loader?lang=markup!./scaling/scaling.html'),
		},
	};
	ngOnInit() {}
}
