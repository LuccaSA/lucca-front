import { Meta, StoryObj } from '@storybook/angular';

interface ButtonBlockStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Block',
} as Meta;

function getTemplate(args: ButtonBlockStory): string {
	return `<button type="button" class="button mod-block">Button</button>`;
}

const Template = (args: ButtonBlockStory) => ({
	props: args,
	template: getTemplate(args),
});

export const BlockButton: StoryObj<ButtonBlockStory> = {
	args: {},
	render: Template,
};
