import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Users/Avatar/HTML&CSS/Group/More',
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
	<li role="presentation" class="avatarWrapper-item">
		<button type="button" class="avatarWrapper-item-action">
			<span class="avatarWrapper-item-action-more">
				<span aria-hidden="true" data-content-before="+8"></span>
				<span class="pr-u-mask">Voir les 8 utilisateurs supplémentaires</span>
			</span>
		</button>
	</li>
</ul>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const More: StoryObj = {
	args: {},
	render: Template,
};
