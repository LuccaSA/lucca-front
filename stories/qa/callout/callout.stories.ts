import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
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

const template: StoryFn<CalloutStory> = () => ({});

export const basic = template.bind({});
