import { Meta, StoryObj } from '@storybook/angular-vite';
import { CDN_URL } from '@lucca-front/ng/core';

export default {
	title: 'Documentation/Users/Avatar/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(): string {
	return `<div class="avatar">
	<img alt="" class="avatar-picture" loading="lazy" src="${CDN_URL}/lucca-front/avatars/finn.png" />
</div>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const Basic: StoryObj = {
	args: {},
	render: Template,
};
