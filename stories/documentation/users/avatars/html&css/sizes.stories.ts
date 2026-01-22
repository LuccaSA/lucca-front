import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Users/Avatar/HTML&CSS/Sizes',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<span class="avatar mod-XS">
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
</span>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const Sizes: StoryObj = {
	args: {},
	render: Template,
};
