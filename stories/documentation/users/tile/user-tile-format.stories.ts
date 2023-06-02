import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuUserDisplayModule, LuUserPictureModule, LuUserTileComponent, LuUserTileModule } from '@lucca-front/ng/user';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { bob, patrick, squidwards } from '../user.mocks';

@Component({
	standalone: true,
	selector: 'user-tile-format-stories',
	templateUrl: './user-tile-format.stories.html',
	imports: [LuUserTileModule, LuUserPictureModule, LuUserDisplayModule],
})
class UserTileFormatStory {
	public bob = bob;
	public patrick = patrick;
	public squidwards = squidwards;
}

export default {
	title: 'Documentation/Users/Tile/Format',
	component: UserTileFormatStory,
	decorators: [
		moduleMetadata({
			imports: [BrowserAnimationsModule],
		}),
	],
} as Meta;

const template: StoryFn<LuUserTileComponent> = (args: LuUserTileComponent) => ({
	props: args,
});

export const format = template.bind({});
format.args = {};

format.parameters = {
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code: '',
		},
	},
};
