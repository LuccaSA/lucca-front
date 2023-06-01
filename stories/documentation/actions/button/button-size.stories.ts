import { Meta, Story } from '@storybook/angular';

interface ButtonSizeStory {}

export default {
	title: 'Documentation/Actions/Button/Size',
	argTypes: {},
} as Meta;

function getTemplate(args: ButtonSizeStory): string {
	return `
	<button type="button" class="button">Bouton</button>
	<button type="button" class="button mod-S">Bouton</button>
	<button type="button" class="button mod-XS">Bouton</button>
	`;
}

const Template: Story<ButtonSizeStory> = (args: ButtonSizeStory) => ({
	props: args,
	template: getTemplate(args),
});

export const SizeButton = Template.bind({});
SizeButton.args = {};
