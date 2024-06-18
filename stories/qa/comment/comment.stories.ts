import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'comment-stories',
	templateUrl: './comment.stories.html',
})
class CommentStory {}

export default {
	title: 'QA/Comment',
	component: CommentStory,
} as Meta;

const template: StoryFn<CommentStory> = () => ({});

export const basic = template.bind({});
