import { Meta, StoryFn } from '@storybook/angular';

interface UserAvatarGroupMoreStory {}

export default {
	title: 'Documentation/Users/Avatar/HTML&CSS/Group/More',
	argTypes: {},
} as Meta;

function getTemplate(args: UserAvatarGroupMoreStory): string {
	return `<ul class="avatarWrapper">
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="u-mask">Finn Mertens</span>
	</li>
	<li role="presentation" class="avatarWrapper-item">
		<button type="button" class="avatarWrapper-item-action">
			<span class="avatarWrapper-item-action-more">
				<span aria-hidden="true" data-content-before="+8"></span>
				<span class="u-mask">Voir les 8 utilisateurs supplémentaires</span>
			</span>
		</button>
	</li>
</ul>`;
}

const Template: StoryFn<UserAvatarGroupMoreStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const More = Template.bind({});
More.args = {};
