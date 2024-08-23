import { Meta, StoryFn } from '@storybook/angular';

interface UserAvatarGroupClickableStory {}

export default {
	title: 'Documentation/Users/Avatar/HTML&CSS/Group/Clickable',
	argTypes: {},
} as Meta;

function getTemplate(args: UserAvatarGroupClickableStory): string {
	return `<ul class="avatarWrapper">
	<li class="avatarWrapper-item">
		<a href="#" class="avatarWrapper-item-action">
			<span class="avatar">
				<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
			</span>
			<span class="u-mask">Finn Mertens</span>
		</a>
	</li>
	<li class="avatarWrapper-item">
		<a href="#" class="avatarWrapper-item-action">
			<span class="avatar">
				<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
			</span>
			<span class="u-mask">Finn Mertens</span>
		</a>
	</li>
	<li class="avatarWrapper-item">
		<a href="#" class="avatarWrapper-item-action">
			<span class="avatar">
				<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
			</span>
			<span class="u-mask">Finn Mertens</span>
		</a>
	</li>
</ul>`;
}

const Template: StoryFn<UserAvatarGroupClickableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Clickable = Template.bind({});
Clickable.args = {};
