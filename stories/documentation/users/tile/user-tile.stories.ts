import { Story, Meta, componentWrapperDecorator } from '@storybook/angular';

import { LuUserTileComponent, LuUserPictureModule, LuUserDisplayModule } from '@lucca-front/ng/user';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bob } from '../user.mocks';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
	selector: 'user-tile-stories',
	template: `
<lu-user-tile [user]="bob"></lu-user-tile>
`,
}) class UserTileStory {
	public bob = bob;
}

export default {
	title: 'Documentation/Users/Tile',
	component: LuUserTileComponent,
	decorators: [
		componentWrapperDecorator(UserTileStory),
		moduleMetadata({
			declarations: [UserTileStory],
			imports: [
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

const code = () => `<lu-user-tile [user]="bob"></lu-user-tile>`

export const basic = template.bind({});
basic.args = {}

basic.parameters = {
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			code: code()
		}
	}
}
