import { Meta, StoryFn } from '@storybook/angular';

interface UserTileBasicStory {}

export default {
	title: 'Documentation/Users/Tile/HTML&CSS/Sizes',
	argTypes: {},
} as Meta;

function getTemplate(args: UserTileBasicStory): string {
	return `<div class="userTile mod-XS">
	<div class="avatar">
		<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
	</div>
	<dl class="userTile-content">
		<dt class="userTile-content-name">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
</div>
<div class="userTile mod-S">
	<div class="avatar">
		<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
	</div>
	<dl class="userTile-content">
		<dt class="userTile-content-name">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
</div>
<div class="userTile">
	<div class="avatar">
		<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
	</div>
	<dl class="userTile-content">
		<dt class="userTile-content-name">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
	</div>
<div class="userTile mod-L">
	<div class="avatar">
		<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
	</div>
	<dl class="userTile-content">
		<dt class="userTile-content-name">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
</div>`;
}

const Template: StoryFn<UserTileBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
