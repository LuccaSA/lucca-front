import { Meta, Story } from '@storybook/angular';

interface ButtonIconStory {
}

export default {
	title: 'Documentation/Actions/Button/Icon',
} as Meta;

function getTemplate(args: ButtonIconStory): string {
	return `
	<button type="button" class="button mod-icon"><span aria-hidden="true" class="lucca-icon icon-save"></span>Sauvegarder</button>
	<button type="button" class="button mod-icon">Envoyer<span aria-hidden="true" class="lucca-icon icon-send"></span></button>
	`;
}

const Template: Story<ButtonIconStory> = (args: ButtonIconStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.button {
			vertical-align: top;
		}`,
		args.mod === 'mod-text mod-invert' ? ':host { background-color: #333333; margin: -15px -15px; padding: 15px 15px; }' : '',
	],
});

export const Icon = Template.bind({});
Icon.args = { };
