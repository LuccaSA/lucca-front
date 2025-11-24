import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'avatar-stories',
	templateUrl: './avatar.stories.html',
	styleUrl: './avatar.stories.scss',
})
class AvatarStory {}

export default {
	title: 'QA/Avatar',
	component: AvatarStory,
} as Meta;

const template: StoryFn<AvatarStory> = () => ({});

export const basic = template.bind({});
