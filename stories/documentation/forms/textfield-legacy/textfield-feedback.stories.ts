import { Meta, StoryObj } from '@storybook/angular';

interface TextfieldFeedbackStory {}

export default {
	title: 'Documentation/Forms/Textfield Legacy/Feedback',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldFeedbackStory): string {
	return `<label class="textfield is-loading">
	<input class="textfield-input" type="text">
	<span class="textfield-label">Loading</span>
</label>
<label class="textfield is-valid">
	<input class="textfield-input" type="text">
	<span class="textfield-label">Valid</span>
</label>
<label class="textfield is-invalid">
	<input class="textfield-input" type="text">
	<span class="textfield-label">Invalid</span>
</label>`;
}

const Template = (args: TextfieldFeedbackStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.textfield {
			display: inline-flex;
			margin-inline-end: 1rem;
		}`,
	],
});

export const Feedback: StoryObj<TextfieldFeedbackStory> = {
	args: {},
	render: Template,
};
