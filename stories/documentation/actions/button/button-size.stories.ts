import { Meta, Story } from '@storybook/angular';

interface ButtonSizeStory {
}

export default {
	title: 'Documentation/Actions/Button/Size',
	argTypes: {
	},
} as Meta;

function getTemplate(args: ButtonSizeStory): string {
	return `
	<button type="button" class="button">Confirmer</button>
	<button type="button" class="button mod-outlined">Enregistrer</button>
	<button type="button" class="button mod-text">Annuler</button>
	`;
}

const Template: Story<ButtonSizeStory> = (args: ButtonSizeStory) => ({
	props: args,
	template: getTemplate(args),
});

export const SizeButton = Template.bind({});
SizeButton.args = { };
