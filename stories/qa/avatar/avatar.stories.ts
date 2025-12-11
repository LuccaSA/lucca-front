import { Component } from '@angular/core';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'avatar-stories',
	templateUrl: './avatar.stories.html',
	styles: [
		`
			.avatar-picture:has(.avatar-picture-initials) {
				background-color: rgb(202 92 214);
			}
		`,
	],
	imports: [LuUserPictureComponent],
})
class AvatarStory {}

export default {
	title: 'QA/Avatar',
	component: AvatarStory,
} as Meta;

const template: StoryFn<AvatarStory> = () => ({});

export const Basic = template.bind({});
