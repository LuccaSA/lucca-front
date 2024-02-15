import { Meta, StoryFn } from '@storybook/angular';

interface ButtonDisabledStory {}

export default {
	title: 'Documentation/Actions/Button/HTML&CSS/Disabled',
	argTypes: {},
} as Meta;

function getTemplate(args: ButtonDisabledStory): string {
	return `<button type="button" class="button" disabled>Button</button>`;
}

const Template: StoryFn<ButtonDisabledStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const DisabledButton = Template.bind({});
DisabledButton.args = {};
