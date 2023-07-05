import { Meta, Story } from '@storybook/angular';

interface ButtonDisabledStory {}

export default {
	title: 'Documentation/Actions/Button/Disabled',
	argTypes: {},
} as Meta;

function getTemplate(args: ButtonDisabledStory): string {
	return `
	<button type="button" class="button" disabled>Confirmer</button>

	`;
}

const Template: Story<ButtonDisabledStory> = (args: ButtonDisabledStory) => ({
	props: args,
	template: getTemplate(args),
});

export const DisabledButton = Template.bind({});
DisabledButton.args = {};
