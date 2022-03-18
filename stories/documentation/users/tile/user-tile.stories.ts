import { Story, Meta } from '@storybook/angular';

import { LuUserTileComponent, LuUserPictureModule, LuUserDisplayModule } from '@lucca-front/ng/user';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { bob, patrick, squidwards } from '../user.mocks';

export default {
	title: 'Documentation/Users/Tile',
	component: LuUserTileComponent,
	decorators: [
		moduleMetadata({
			declarations: [],
			imports: [
				LuUserPictureModule,
				LuUserDisplayModule,
				CommonModule,
			]
		}),
	],
} as Meta;

const Template: Story<LuUserTileComponent> = (args: LuUserTileComponent) => ({
	props: args,
});

export const Bob = Template.bind({});
Bob.args = {
	user: bob,
};
export const Patrick = Template.bind({});
Patrick.args = {
	user: patrick,
};
export const Squidwards = Template.bind({});
Squidwards.args = {
	user: squidwards,
};
