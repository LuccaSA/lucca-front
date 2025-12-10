import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'user-tile-stories',
	templateUrl: './user-tile.stories.html',
})
class UserTileStory {}

export default {
	title: 'QA/UserTile',
	component: UserTileStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<UserTileStory> = {
	args: {},
	render: template,
};
