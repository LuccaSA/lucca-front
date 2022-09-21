import { Component, Input, Optional } from '@angular/core';
import { ILuUser, LuDisplayInitials, LuUserPictureComponent, LuUserPictureModule } from '@lucca-front/ng/user';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import { bob, squidwards } from '../user.mocks';

@Component({
	selector: 'user-picture-stories',
	template: `<lu-user-picture [user]="user" [displayFormat]="displayFormat" data-testid="lu-user-picture" [class]="sizes"></lu-user-picture>`,
})
class UserPictureStory {
	@Input() user: ILuUser;
	@Input() sizes: string;
	@Input() @Optional() displayFormat: LuDisplayInitials;
}

export default {
	title: 'Documentation/Users/Picture/Basic',
	component: LuUserPictureComponent,
	argTypes: {
		user: {
			options: ['Avec image', 'Sans image'],
			mapping: {
				'Avec image': bob,
				'Sans image': squidwards,
			},
		},
		sizes: {
			options: ['mod-smallest', 'mod-smaller', 'mod-small', 'mod-large', 'mod-larger', 'mod-largest'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		componentWrapperDecorator(UserPictureStory, (props: UserPictureStory) => ({ user: props.user, displayFormat: props.displayFormat })),
		moduleMetadata({
			imports: [LuUserPictureModule],
			declarations: [UserPictureStory],
		}),
	],
} as Meta;

const template: Story<UserPictureStory> = (args: UserPictureStory) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {
	user: bob,
	sizes: 'mod-larger',
	displayFormat: LuDisplayInitials.firstlast,
};

const code = `
/* 1. Importer LuUserPictureModule */
import { LuUserPictureModule } from '@lucca-front/ng/user';

@NgModule({
	imports: [LuUserPictureModule]
})
class StoriesModule {}

/* 2. Utiliser lu-user-picture */
@Component({
	selector: 'user-picture-stories',
	template: \`<lu-user-picture [user]="user" [displayFormat]="displayFormat" [class]="sizes"></lu-user-picture>\`,
})
class UserPictureStory {
	@Input() user: ILuUser;
	@Input() sizes: string;
	@Input() @Optional() displayFormat: LuDisplayInitials;
}`;

Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: ['user', 'displayFormat', 'sizes'] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
