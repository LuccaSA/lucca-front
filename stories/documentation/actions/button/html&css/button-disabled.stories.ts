import { Meta, StoryObj } from '@storybook/angular';

interface ButtonDisabledStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Disabled',
	argTypes: {},
} as Meta;

function getTemplate(args: ButtonDisabledStory): string {
	return `<button type="button" class="button" disabled>Button</button>`;
}

const Template = (args: ButtonDisabledStory) => ({
	props: args,
	template: getTemplate(args),
});

export const DisabledButton: StoryObj<ButtonDisabledStory> = {
	args: {},
	render: Template,
};
