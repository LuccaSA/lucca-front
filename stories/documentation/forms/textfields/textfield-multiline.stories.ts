import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldMultilineStory {}

export default {
	title: 'Documentation/Forms/Textfield/Multiline',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldMultilineStory): string {
	return `
		<label class="textfield mod-multiline">
			<textarea class="textfield-input"></textarea>
			<span class="textfield-label">Label</span>
		</label>
	`;
}

const Template: StoryFn<TextfieldMultilineStory> = (args: TextfieldMultilineStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Multiline = Template.bind({});
Multiline.args = {};
