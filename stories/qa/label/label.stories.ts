import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
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

const template: StoryFn<LabelStory> = () => ({});

export const basic = template.bind({});
