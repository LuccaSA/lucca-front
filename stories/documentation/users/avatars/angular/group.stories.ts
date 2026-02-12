import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { Meta, StoryObj } from '@storybook/angular';
import { squidwards } from '../../user.mocks';

@Component({
	selector: 'avatar-stories',
	imports: [LuUserPictureModule],
	template: `
		<ul class="avatarWrapper" [class]="sizes()">
			<li class="avatarWrapper-item" translate="no">
				<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
				<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item" translate="no">
				<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
				<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item" translate="no">
				<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
				<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item" translate="no">
				<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
				<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item" translate="no">
				<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
				<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
		</ul>

		<ul class="avatarWrapper" [class]="sizes()">
			<li class="avatarWrapper-item" translate="no">
				<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
				<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item" translate="no">
				<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
				<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item" translate="no">
				<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
				<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item" translate="no">
				<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
				<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
			</li>
			<li class="avatarWrapper-item" role="presentation">
				<button type="button" class="avatarWrapper-item-action">
					<span class="avatarWrapper-item-action-more">
						<span aria-hidden="true" data-content-before="+6"></span>
						<span class="pr-u-mask">Voir les 6 utilisateurs supplémentaires</span>
					</span>
				</button>
			</li>
		</ul>

		<ul class="avatarWrapper" [class]="sizes()">
			<li class="avatarWrapper-item" translate="no">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
					<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item" translate="no">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
					<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item" translate="no">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
					<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item" translate="no">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
					<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item" translate="no">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
					<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
		</ul>

		<ul class="avatarWrapper" [class]="sizes()">
			<li class="avatarWrapper-item" translate="no">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
					<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item" translate="no">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
					<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item" translate="no">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
					<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item" translate="no">
				<a href="#" class="avatarWrapper-item-action">
					<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
					<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
				</a>
			</li>
			<li class="avatarWrapper-item" role="presentation">
				<button type="button" class="avatarWrapper-item-action">
					<span class="avatarWrapper-item-action-more">
						<span aria-hidden="true" data-content-before="+6"></span>
						<span class="pr-u-mask">Voir les 6 utilisateurs supplémentaires</span>
					</span>
				</button>
			</li>
		</ul>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class AvatarStory {
	sizes = input<string>();

	user = squidwards;
}

export default {
	title: 'Documentation/Users/Avatar/Angular/Group',
	component: AvatarStory,
	argTypes: {
		sizes: {
			options: ['mod-XS', 'mod-S', '', 'mod-L', 'mod-XL'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Basic: StoryObj<AvatarStory> = {
	args: {
		sizes: '',
	},
};

Basic.parameters = {
	controls: { include: ['sizes'] },
};
