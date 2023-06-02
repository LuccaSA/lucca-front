import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'collapse-stories',
	templateUrl: './collapse.stories.html',
})
class CollapseStory {}

export default {
	title: 'QA/Collapse',
	component: CollapseStory,
} as Meta;

const template: StoryFn<CollapseStory> = () => ({});

export const basic = template.bind({});
