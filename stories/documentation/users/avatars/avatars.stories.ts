import { Component, Input, Optional } from '@angular/core';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { Meta, StoryFn } from '@storybook/angular';
import { squidwards } from '../user.mocks';

@Component({
	selector: 'avatarWrapper-stories',
	standalone: true,
	imports: [LuUserPictureModule],
	template: `
		<ul class="avatarWrapper" [class]="sizes">
			<li class="avatarWrapper-item">
				<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item">
				<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item">
				<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item">
				<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item">
				<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
		</ul>

		<ul class="avatarWrapper" [class]="sizes">
			<li class="avatarWrapper-item">
				<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item">
				<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item">
				<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item">
				<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item" role="presentation">
				<button type="button" class="avatarWrapper-item-action">
					<span class="avatarWrapper-item-action-more">
						<span aria-hidden="true" data-content-before="+6"></span>
						<span class="u-mask">Voir les 6 utilisateurs supplémentaires</span>
					</span>
				</button>
			</li>
		</ul>

		<ul class="avatarWrapper" [class]="sizes">
			<li class="avatarWrapper-item">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
		</ul>

		<ul class="avatarWrapper" [class]="sizes">
			<li class="avatarWrapper-item">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatarWrapper-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item" role="presentation">
				<button type="button" class="avatarWrapper-item-action">
					<span class="avatarWrapper-item-action-more">
						<span aria-hidden="true" data-content-before="+6"></span>
						<span class="u-mask">Voir les 6 utilisateurs supplémentaires</span>
					</span>
				</button>
			</li>
		</ul>
	`,
})
class AvatarWrapperStory {
	@Input() @Optional() sizes: string;

	user = squidwards;
}

export default {
	title: 'Documentation/Users/AvatarWrapper/Basic',
	component: AvatarWrapperStory,
	argTypes: {
		sizes: {
			options: ['mod-XS', 'mod-S', '', 'mod-L', 'mod-XL'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

const template: StoryFn<AvatarWrapperStory> = (args: AvatarWrapperStory) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {
	sizes: '',
};

Basic.parameters = {
	controls: { include: ['sizes'] },
};
