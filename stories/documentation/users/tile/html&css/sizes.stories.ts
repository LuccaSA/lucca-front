import { Meta, StoryFn } from '@storybook/angular';

interface UserTileBasicStory {
}

export default {
	title: 'Documentation/Users/Tile/HTML&CSS/Sizes',
	argTypes: {
	},
} as Meta;

function getTemplate(args: UserTileBasicStory): string {
	return `<div class="userTile mod-XS">
	<div class="avatar"></div>
	<dl class="userTile-content">
		<dt class="userTile-content-name">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
</div>
<div class="userTile mod-S">
	<div class="avatar"></div>
	<dl class="userTile-content">
		<dt class="userTile-content-name">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
</div>
<div class="userTile">
	<div class="avatar"></div>
	<dl class="userTile-content">
		<dt class="userTile-content-name">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
	</div>
<div class="userTile mod-L">
<div class="avatar"></div>
	<dl class="userTile-content">
		<dt class="userTile-content-name">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
</div>`;
}

const Template: StoryFn<UserTileBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		.avatar {
			background: lime;
			height: var(--components-avatar-size, 2.5rem);
			width: var(--components-avatar-size, 2.5rem);
			background: var(--palettes-neutral-100) url("https://cdn.lucca.fr/lucca-front/avatars/finn.png") center;
			background-size: cover;
			flex-shrink: 0;
		}
	`],
});

export const Basic = Template.bind({});
Basic.args = { };
