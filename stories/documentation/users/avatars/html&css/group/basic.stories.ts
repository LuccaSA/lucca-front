import { Meta, StoryFn } from '@storybook/angular';

interface UserAvatarGroupBasicStory {}

export default {
	title: 'Documentation/Users/Avatar/HTML&CSS/Group/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: UserAvatarGroupBasicStory): string {
	return `
<ul class="avatarWrapper">
	<li class="avatarWrapper-item">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="u-mask">Finn Mertens</span>
	</li>
</ul>
	`;
}

const Template: StoryFn<UserAvatarGroupBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
