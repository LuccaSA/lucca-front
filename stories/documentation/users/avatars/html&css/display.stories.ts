import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Users/Avatar/HTML&CSS/Display',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<span class="avatar">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar" translate="no">
	<span class="avatar-picture" style="background-color: rgb(202, 92, 214)">
		<span class="avatar-picture-initials">FM</span>
	</span>
</span>
<span class="avatar mod-placeholder" translate="no">
	<span class="avatar-picture"></span>
</span>
<span class="avatar mod-AI" translate="no">
	<span class="avatar-picture"></span>
</span>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const Display: StoryObj = {
	args: {},
	render: Template,
};
