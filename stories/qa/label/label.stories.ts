import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'label-stories',
	templateUrl: './label.stories.html',
}) class LabelStory {}

export default {
  title: 'QA/Label',
  component: LabelStory,
	decorators: [
		moduleMetadata({
			entryComponents: [LabelStory]
		})
	]
} as Meta;

const template: Story<LabelStory> = () => ({});

export const basic = template.bind({});
