import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'collapse-stories',
	templateUrl: './collapse.stories.html',
})
class CollapseStory {}

export default {
	title: 'QA/Collapse',
	component: CollapseStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<CollapseStory> = {
	args: {},
	render: template,
};
