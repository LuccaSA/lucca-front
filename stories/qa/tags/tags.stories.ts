import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'tags-stories',
	templateUrl: './tags.stories.html',
})
class TagsStory {}

export default {
	title: 'QA/Tags',
	component: TagsStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TagsStory> = {
	args: {},
	render: template,
};
