import { Component, Input, Optional } from '@angular/core';
import { ILuUser, LuDisplayInitials, LuUserDisplayPipe, LuUserPictureComponent, LuUserPictureModule } from '@lucca-front/ng/user';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import { bob, squidwards } from '../user.mocks';

@Component({
	selector: 'user-picture-stories',
	template: `<lu-user-picture [user]="user" [displayFormat]="displayFormat" data-testid="lu-user-picture" [ngClass]="sizes" [class.mod-placeholder]="placeholder"></lu-user-picture>`,
})
class UserPictureStory {
	@Input() user: ILuUser;
	@Input() @Optional() sizes: string;
	@Input() @Optional() placeholder: boolean;
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
	decorators: [
		componentWrapperDecorator(UserPictureStory, (props: UserPictureStory) => ({
			user: props.user,
			displayFormat: props.displayFormat,
			sizes: props.sizes,
			placeholder: props.placeholder,
		})),
		moduleMetadata({
			imports: [LuUserPictureModule],
			providers: [LuUserDisplayPipe],
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
