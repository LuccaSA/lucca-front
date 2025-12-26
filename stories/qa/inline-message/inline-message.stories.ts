import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'inline-message-stories',
	templateUrl: './inline-message.stories.html',
	imports: [InlineMessageComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class InlineMessageStory {}

export default {
	title: 'QA/InlineMessage',
	component: InlineMessageStory,
	decorators: [
		moduleMetadata({
			entryComponents: [InlineMessageStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<InlineMessageStory> = {
	args: {},
	render: template,
};
