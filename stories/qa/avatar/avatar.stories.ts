import { Component } from '@angular/core';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'avatar-stories',
	templateUrl: './avatar.stories.html',
	styleUrl: './avatar.stories.scss',
	imports: [LuUserPictureComponent],
})
class AvatarStory {}

export default {
	title: 'QA/Avatar',
	component: AvatarStory,
} as Meta;

const template: StoryFn<AvatarStory> = () => ({});

export const basic = template.bind({});
