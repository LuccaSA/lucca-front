import { Meta, StoryObj } from '@storybook/angular';

interface TextfieldMultilineStory {}

export default {
	title: 'Documentation/Forms/Textfield Legacy/Multiline',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldMultilineStory): string {
	return `<label class="textfield mod-multiline">
	<textarea class="textfield-input"></textarea>
	<span class="textfield-label">Label</span>
</label>`;
}

const Template = (args: TextfieldMultilineStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Multiline: StoryObj<TextfieldMultilineStory> = {
	args: {},
	render: Template,
};
