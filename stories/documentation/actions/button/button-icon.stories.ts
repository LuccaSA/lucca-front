import { Meta, StoryFn } from '@storybook/angular';

interface ButtonIconStory {}

export default {
	title: 'Documentation/Actions/Button/Icon',
} as Meta;

function getTemplate(args: ButtonIconStory): string {
	return `<button type="button" class="button mod-icon"><span aria-hidden="true" class="lucca-icon icon-save"></span>Sauvegarder</button>
	<button type="button" class="button mod-icon">Envoyer<span aria-hidden="true" class="lucca-icon icon-send"></span></button>`;
}

const Template: StoryFn<ButtonIconStory> = (args: ButtonIconStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.button {
			vertical-align: top;
		}`,
	],
});

export const IconButton = Template.bind({});
IconButton.args = {};
