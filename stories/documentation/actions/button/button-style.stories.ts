import { Meta, StoryFn } from '@storybook/angular';

interface ButtonStyleStory {}

export default {
	title: 'Documentation/Actions/Button/Style',
	argTypes: {},
} as Meta;

function getTemplate(args: ButtonStyleStory): string {
	return `<button type="button" class="button">Confirmer</button>
<button type="button" class="button mod-outlined">Enregistrer</button>
<button type="button" class="button mod-text">Annuler</button>`;
}

const Template: StoryFn<ButtonStyleStory> = (args: ButtonStyleStory) => ({
	props: args,
	template: getTemplate(args),
});

export const StyleButton = Template.bind({});
StyleButton.args = {};
