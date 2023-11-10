import { Component, Input, Optional } from '@angular/core';
import { ILuUser, LuDisplayInitials, LuUserPictureModule } from '@lucca-front/ng/user';
import { Meta, StoryFn } from '@storybook/angular';
import { bob, georges, squidwards } from '../user.mocks';

@Component({
	selector: 'user-picture-stories',
	standalone: true,
	imports: [LuUserPictureModule],
	template: `<lu-user-picture [user]="user" [displayFormat]="displayFormat" data-testid="lu-user-picture" [class]="sizes" [class.mod-placeholder]="placeholder"></lu-user-picture>`,
})
class UserPictureStory {
	@Input() user: ILuUser;
	@Input() @Optional() sizes: string;
	@Input() @Optional() placeholder: boolean;
	@Input() @Optional() displayFormat: LuDisplayInitials;
}

export default {
	title: 'Documentation/Users/Picture/Basic',
	component: UserPictureStory,
	argTypes: {
		user: {
			options: ['Avec image', 'Avec image erronée', 'Sans image'],
			mapping: {
				'Avec image': bob,
				'Avec image erronée': georges,
				'Sans image': squidwards,
			},
		},
		sizes: {
			options: ['mod-XS', 'mod-S', '', 'mod-L'],
			control: {
				type: 'select',
			},
		},
		placeholder: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

const template: StoryFn<UserPictureStory> = (args: UserPictureStory) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {
	user: bob,
	sizes: '',
	placeholder: false,
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
	template: \`<lu-user-picture [user]="user" [displayFormat]="displayFormat" [class]="sizes" [class.mod-placeholder]="placeholder"></lu-user-picture>\`,
})
class UserPictureStory {
	@Input() user: ILuUser;
	@Input() @Optional() sizes: string;
	@Input() @Optional() placeholder: boolean;
	@Input() @Optional() displayFormat: LuDisplayInitials;
}`;

Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: ['user', 'displayFormat', 'sizes', 'placeholder'] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
