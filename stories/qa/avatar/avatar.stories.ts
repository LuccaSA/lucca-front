import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'avatar-stories',
	templateUrl: './avatar.stories.html',
	styleUrl: './avatar.stories.scss',
})
class AvatarStory {}

export default {
	title: 'QA/Avatar',
	component: AvatarStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<AvatarStory> = {
	args: {},
	render: template,
};
