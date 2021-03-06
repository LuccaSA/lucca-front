import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'callout-stories',
	templateUrl: './callout.stories.html',
}) class CalloutStory {}

export default {
  title: 'QA/Callout',
  component: CalloutStory,
	decorators: [
		moduleMetadata({
			entryComponents: [CalloutStory]
		})
	]
} as Meta;

const template: Story<CalloutStory> = () => ({});

export const basic = template.bind({});
