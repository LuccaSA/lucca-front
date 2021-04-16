import { Story, Meta } from '@storybook/angular/types-6-0';

import { LuUserTileComponent, LuUserPictureModule, LuUserDisplayModule, ILuUser} from '@lucca-front/ng/user';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

export default {
	title: 'User/Tile',
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

const bob: ILuUser = {
	id: 12,
	firstName: 'SpongeBob',
	lastName: 'SquarePants',
	pictureHref: 'https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png',
	jobTitle: 'Cook @KrustyKrab'
};
const patrick: ILuUser = {
	id: 13,
	firstName: 'Patrick',
	lastName: 'Starfish',
	picture: {
		href: 'https://nickelodeonuniverse.com/wp-content/uploads/Patrick.png',
	},
	jobTitle: 'Happiness Guru'
};
const squidwards: ILuUser = {
	id: 14,
	firstName: 'Squidwards',
	lastName: 'Tentacles',
	jobTitle: 'Cashier @KrustyKrab'
}


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