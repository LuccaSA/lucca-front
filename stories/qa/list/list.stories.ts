import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'list-stories',
	templateUrl: './list.stories.html',
})
class ListStory {}

export default {
	title: 'QA/List',
	component: ListStory,
} as Meta;

const template: StoryFn<ListStory> = () => ({});

export const Basic = template.bind({});
