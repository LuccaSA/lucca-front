import { Component } from '@angular/core';
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'inline-message-stories',
	templateUrl: './inline-message.stories.html',
	imports: [InlineMessageComponent],
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

const template: StoryFn<InlineMessageStory> = () => ({});

export const basic = template.bind({});
