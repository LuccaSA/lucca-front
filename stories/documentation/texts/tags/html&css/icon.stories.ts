import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Icon',
} as Meta;

function getTemplate(): string {
	return `<span class="tag">
	<span class="lucca-icon icon-heart" aria-hidden="true"></span> <span class="tag-content">Text</span>
</span>`;
}

const Template = () => ({
	template: getTemplate(),
});

export const Icon: StoryObj = {
	args: {},
	render: Template,
};
