import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'collapse-stories',
	templateUrl: './collapse.stories.html',
}) class CollapseStory {}

export default {
  title: 'QA/Collapse',
  component: CollapseStory,
	decorators: [
		moduleMetadata({
			entryComponents: [CollapseStory]
		})
	]
} as Meta;

const template: StoryFn<CollapseStory> = () => ({});

export const basic = template.bind({});
