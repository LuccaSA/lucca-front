import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'user-tile-stories',
	templateUrl: './user-tile.stories.html',
})
class UserTileStory {}

export default {
	title: 'QA/UserTile',
	component: UserTileStory,
} as Meta;

const template: StoryFn<UserTileStory> = () => ({});

export const Basic = template.bind({});
