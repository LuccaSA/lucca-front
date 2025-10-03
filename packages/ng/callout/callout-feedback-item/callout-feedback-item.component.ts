import { Component, Directive, ViewEncapsulation } from '@angular/core';

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'lu-feedback-item-description',
	standalone: true,
})
export class CalloutFeedbackItemDescriptionDirective {}

@Component({
	selector: 'li[lu-callout-feedback-item]',
	standalone: true,
	imports: [],
	templateUrl: './callout-feedback-item.component.html',
	styleUrl: './callout-feedback-item.component.scss',
	host: {
		class: 'calloutFeedbackList-item',
	},
	encapsulation: ViewEncapsulation.None,
})
export class CalloutFeedbackItemComponent {}
