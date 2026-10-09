import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/OnlyIcon',
} as Meta;

function getTemplate(): string {
	return `<span class="tag">
	<span class="lucca-icon icon-heart" aria-hidden="true"></span>
</span>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const OnlyIcon: StoryObj = {
	args: {},
	render: Template,
};
