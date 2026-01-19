import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Tags/HTML&CSS/Outlined',
} as Meta;

function getTemplate(): string {
	return '<span class="tag mod-outlined">Text</span>';
}

const Template = () => ({
	template: getTemplate(),
});

export const Outlined: StoryObj = {
	args: {},
	render: Template,
};
