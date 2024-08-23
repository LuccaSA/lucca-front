import { Meta, StoryFn } from '@storybook/angular';

interface UserAvatarSizesStory {}

export default {
	title: 'Documentation/Users/Avatar/HTML&CSS/Sizes',
	argTypes: {},
} as Meta;

function getTemplate(args: UserAvatarSizesStory): string {
	return `
<span class="avatar mod-XS">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar mod-S">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar mod-M">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar mod-L">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar mod-XL">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar mod-XXL">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar mod-XXXL">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
	`;
}

const Template: StoryFn<UserAvatarSizesStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Sizes = Template.bind({});
Sizes.args = {};
