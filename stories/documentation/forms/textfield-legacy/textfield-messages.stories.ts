import { Meta, Story } from '@storybook/angular';

interface TextfieldMessagesStory {}

export default {
	title: 'Documentation/Forms/Textfield Legacy/Messages',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldMessagesStory): string {
	return `
		<label class="textfield">
			<input class="textfield-input" type="text">
			<span class="textfield-label">Label</span>
			<span class="textfield-messages">
				<span class="textfield-messages-helper">Helper message</span>
			</span>
		</label>
		<label class="textfield">
			<input class="textfield-input" type="text">
			<span class="textfield-label">Label</span>
			<span class="textfield-messages">
				<span class="textfield-messages-warning">Warning message</span>
			</span>
		</label>
		<label class="textfield">
			<input class="textfield-input is-error" type="text">
			<span class="textfield-label">Label</span>
			<span class="textfield-messages">
				<span class="textfield-messages-error"><span aria-hidden="true" class="lucca-icon icon-error"></span> Helper message</span>
			</span>
		</label>
	`;
}

const Template: Story<TextfieldMessagesStory> = (args: TextfieldMessagesStory) => ({
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
