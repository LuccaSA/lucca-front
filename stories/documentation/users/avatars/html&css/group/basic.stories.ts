import { Meta, StoryFn } from '@storybook/angular';

export default {
	title: 'Documentation/Users/Avatar/HTML&CSS/Group/Basic',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<ul class="avatarWrapper">
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
</ul>`;
}

const Template: StoryFn = () => ({
	template: getTemplate(),
});

export const Basic = Template.bind({});
