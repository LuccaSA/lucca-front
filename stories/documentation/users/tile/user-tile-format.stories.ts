import { Story, Meta } from '@storybook/angular';

import { LuUserTileComponent, LuUserPictureModule, LuUserDisplayModule, LuUserTileModule } from '@lucca-front/ng/user';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bob, patrick, squidwards } from '../user.mocks';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
	selector: 'user-tile-format-stories',
	templateUrl: './user-tile-format.stories.html',
}) class UserTileFormatStory {
	public bob = bob;
	public patrick = patrick;
	public squidwards = squidwards;
}

export default {
	title: 'Documentation/Users/Tile/Format',
	component: UserTileFormatStory,
	decorators: [
		moduleMetadata({
			imports: [
				LuUserTileModule,
				LuUserPictureModule,
				LuUserDisplayModule,
				BrowserAnimationsModule,
				CommonModule,
			]
		}),
	],
} as Meta;

const template: Story<LuUserTileComponent> = (args: LuUserTileComponent) => ({
	props: args,
});


export const format = template.bind({});
format.args = {}

format.parameters = {
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code: '',
		}
	}
}
