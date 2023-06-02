import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldMessagesStory {}

export default {
	title: 'Documentation/Forms/Textfield/Messages',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldMessagesStory): string {
	return `
		<label class="textfield">
			<input class="textfield-input" type="text">
			<span class="textfield-label">Avec helper</span>
			<span class="textfield-messages">
				<span class="textfield-messages-helper">Indications de saisie</span>
			</span>
		</label>
		<label class="textfield">
			<input class="textfield-input" type="text">
			<span class="textfield-label">Avec avertissement</span>
			<span class="textfield-messages">
				<span class="textfield-messages-warning">Ceci est un avertissement</span>
			</span>
		</label>
		<label class="textfield">
			<input class="textfield-input is-error" type="text">
			<span class="textfield-label">Avec erreur</span>
			<span class="textfield-messages">
				<span class="textfield-messages-error">Oops, il y a une erreur !</span>
			</span>
		</label>
	`;
}

const Template: StoryFn<TextfieldMessagesStory> = (args: TextfieldMessagesStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.textfield {
			display: inline-flex;
			margin-right: 1rem;
		}`,
	],
});

export const Messages = Template.bind({});
Messages.args = {};
