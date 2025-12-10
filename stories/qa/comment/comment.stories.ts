import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

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

const template = () => ({});

export const Basic: StoryObj<CommentStory> = {
	args: {},
	render: template,
};
