import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/HiddenLabel',
} as Meta;

function getTemplate(): string {
	return `<span class="tag">
	<span class="lucca-icon icon-heart" aria-hidden="true"></span>
	<span class="tag-content pr-u-mask">Text</span>
</span>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const hiddenLabel: StoryObj = {
	args: {},
	render: Template,
};
