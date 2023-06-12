import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'divider-stories',
	templateUrl: './divider.stories.html',
}) class DividerStory {}

export default {
  title: 'QA/Divider',
  component: DividerStory,
	decorators: [
		moduleMetadata({
			entryComponents: [DividerStory]
		})
	]
} as Meta;

const template: Story<DividerStory> = () => ({});

export const basic = template.bind({});
