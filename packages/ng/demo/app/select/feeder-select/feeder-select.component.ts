import { Component, OnInit } from '@angular/core';
declare var require: any;
@Component({
	selector: 'demo-feeder-select',
	templateUrl: './feeder-select.component.html',
})
export class DemoFeederSelectComponent {

	snippets = {
		feeder: {
			code: require('!!prismjs-loader?lang=typescript!./feeder-select.component'),
			markup: require('!!prismjs-loader?lang=markup!./feeder-select.component.html')
		},
	};

}
