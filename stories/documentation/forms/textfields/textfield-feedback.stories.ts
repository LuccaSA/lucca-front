import { Meta, Story } from '@storybook/angular';

interface TextifeldFeedbackStory {}

export default {
	title: 'Documentation/Forms/Textifeld/Feedback',
	argTypes: {},
} as Meta;

function getTemplate(args: TextifeldFeedbackStory): string {
	return `
	<label class="textfield is-loading">
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
	</label>
	`
}

const Template: Story<TextifeldFeedbackStory> = (args: TextifeldFeedbackStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		.textfield {
			display: inline-flex;
			margin-right: 1rem;
		}`]
});

export const Feedback = Template.bind({});
Feedback.args = {};
