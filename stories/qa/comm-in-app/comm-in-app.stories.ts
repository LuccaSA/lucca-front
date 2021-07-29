import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'comm-in-app-stories',
	templateUrl: './comm-in-app.stories.html',
}) class CommInAppStory {}

export default {
  title: 'QA/CommInApp',
  component: CommInAppStory,
	decorators: [
		moduleMetadata({
			entryComponents: [CommInAppStory]
		})
	]
} as Meta;

const template: Story<CommInAppStory> = () => ({});

export const all = template.bind({});