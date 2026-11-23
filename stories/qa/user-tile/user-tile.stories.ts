import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { CDN_URL } from '@lucca-front/ng/core';

@Component({
	selector: 'user-tile-stories',
	templateUrl: './user-tile.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class UserTileStory {
	protected readonly cdnUrl = CDN_URL;
}

export default {
	title: 'QA/UserTile',
	component: UserTileStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<UserTileStory> = {
	args: {},
	render: template,
};
