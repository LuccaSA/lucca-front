import { Component, Input, Optional } from '@angular/core';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { Meta, StoryFn } from '@storybook/angular';
import { squidwards } from '../user.mocks';

@Component({
	selector: 'avatars-stories',
	standalone: true,
	imports: [LuUserPictureModule],
	template: `
		<ul class="avatars" [class]="sizes">
			<li class="avatars-item">
				<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatars-item">
				<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatars-item">
				<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatars-item">
				<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatars-item">
				<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
		</ul>

		<ul class="avatars" [class]="sizes">
			<li class="avatars-item">
				<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatars-item">
				<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatars-item">
				<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatars-item">
				<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
				<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatars-item" role="presentation">
				<button type="button" class="avatars-item-action">
					<span class="avatars-item-action-more">
						<span aria-hidden="true" data-content-before="+6"></span>
						<span class="u-mask">Voir les 6 utilisateurs supplémentaires</span>
					</span>
				</button>
			</li>
		</ul>

		<ul class="avatars" [class]="sizes">
			<li class="avatars-item">
				<a href="#" class="avatars-item-action">
					<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatars-item">
				<a href="#" class="avatars-item-action">
					<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatars-item">
				<a href="#" class="avatars-item-action">
					<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatars-item">
				<a href="#" class="avatars-item-action">
					<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatars-item">
				<a href="#" class="avatars-item-action">
					<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
		</ul>

		<ul class="avatars" [class]="sizes">
			<li class="avatars-item">
				<a href="#" class="avatars-item-action">
					<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatars-item">
				<a href="#" class="avatars-item-action">
					<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatars-item">
				<a href="#" class="avatars-item-action">
					<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatars-item">
				<a href="#" class="avatars-item-action">
					<lu-user-picture aria-hidden="true" class="avatars-item-userPicture" [class]="sizes" [user]="user"></lu-user-picture>
					<span class="u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatars-item" role="presentation">
				<button type="button" class="avatars-item-action">
					<span class="avatars-item-action-more">
						<span aria-hidden="true" data-content-before="+6"></span>
						<span class="u-mask">Voir les 6 utilisateurs supplémentaires</span>
					</span>
				</button>
			</li>
		</ul>
	`,
})
class AvatarsStory {
	@Input() @Optional() sizes: string;

	user = squidwards;
}

export default {
	title: 'Documentation/Users/Avatars/Basic',
	component: AvatarsStory,
	argTypes: {
		sizes: {
			options: ['mod-XS', 'mod-S', '', 'mod-L', 'mod-XL'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

const template: StoryFn<AvatarsStory> = (args: AvatarsStory) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {
	sizes: '',
};

Basic.parameters = {
	controls: { include: ['sizes'] },
};
