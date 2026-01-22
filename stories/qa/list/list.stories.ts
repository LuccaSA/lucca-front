import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'list-stories',
	templateUrl: './list.stories.html',
})
class ListStory {}

export default {
	title: 'QA/List',
	component: ListStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<ListStory> = {
	args: {},
	render: template,
};
