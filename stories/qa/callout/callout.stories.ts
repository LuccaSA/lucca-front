import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	CalloutActionsComponent,
	CalloutComponent,
	CalloutDisclosureComponent,
	CalloutFeedbackItemComponent,
	CalloutFeedbackItemDescriptionDirective,
	CalloutFeedbackListComponent,
	CalloutPopoverComponent,
} from '@lucca-front/ng/callout';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'callout-stories',
	templateUrl: './callout.stories.html',
	imports: [
		CalloutComponent,
		CalloutActionsComponent,
		ButtonComponent,
		CalloutDisclosureComponent,
		CalloutFeedbackItemDescriptionDirective,
		CalloutFeedbackListComponent,
		CalloutFeedbackItemComponent,
		CalloutPopoverComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class CalloutStory {}

export default {
	title: 'QA/Callout',
	component: CalloutStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<CalloutStory> = {
	args: {},
	render: template,
};
