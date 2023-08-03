import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'inline-message-stories',
	templateUrl: './inline-message.stories.html',
}) class InlineMessageStory {}

export default {
  title: 'QA/InlineMessage',
  component: InlineMessageStory,
	decorators: [
		moduleMetadata({
			entryComponents: [InlineMessageStory]
		})
	]
} as Meta;

const template: Story<InlineMessageStory> = () => ({});

export const basic = template.bind({});
