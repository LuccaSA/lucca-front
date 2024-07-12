import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'user-tile-stories',
	templateUrl: './user-tile.stories.html',
	styleUrl: './user-tile.stories.scss',
})
class UserTileStory {}

export default {
	title: 'QA/UserTile',
	component: UserTileStory,
} as Meta;

const template: StoryFn<UserTileStory> = () => ({});

export const basic = template.bind({});
