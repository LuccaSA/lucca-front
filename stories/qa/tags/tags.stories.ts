import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'tags-stories',
	templateUrl: './tags.stories.html',
})
class TagsStory {}

export default {
	title: 'QA/Tags',
	component: TagsStory,
} as Meta;

const template: StoryFn<TagsStory> = () => ({});

export const basic = template.bind({});
