import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { CDN_URL } from '@lucca-front/ng/core';

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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class AvatarStory {
	protected readonly cdnUrl = CDN_URL;
}

export default {
	title: 'QA/Avatar',
	component: AvatarStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<AvatarStory> = {
	args: {},
	render: template,
};
