import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Users/Tile/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<div class="userTile">
	<div class="avatar">
		<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
	</div>
	<dl class="userTile-content">
		<dt class="userTile-content-name" translate="no">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
</div>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const Basic: StoryObj = {
	args: {},
	render: Template,
};
