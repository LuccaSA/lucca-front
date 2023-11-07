import { Component } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'li[lu-callout-feedback-item]',
	standalone: true,
	imports: [],
	templateUrl: './callout-feedback-item.component.html',
	styleUrls: ['./callout-feedback-item.component.scss'],
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {
		class: 'calloutFeedbackList-item',
	},
})
export class CalloutFeedbackItemComponent {}
