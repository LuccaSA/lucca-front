import { Component, Input } from '@angular/core';
import { PortalContent, PortalDirective } from '../../core/portal';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'li[lu-callout-feedback-item]',
	standalone: true,
	imports: [PortalDirective],
	templateUrl: './callout-feedback-item.component.html',
	styleUrls: ['./callout-feedback-item.component.scss'],
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {
		class: 'calloutFeedbackList-item',
	},
})
export class CalloutFeedbackItemComponent {
	@Input({
		required: true,
	})
	description: PortalContent;
}
