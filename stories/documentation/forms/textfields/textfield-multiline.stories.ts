import { Meta, Story } from '@storybook/angular';

interface TextifeldMultilineStory {}

export default {
	title: 'Documentation/Forms/Textifeld/Multiline',
	argTypes: {},
} as Meta;

function getTemplate(args: TextifeldMultilineStory): string {
	return `
		<label class="textfield mod-multiline">
			<textarea class="textfield-input"></textarea>
			<span class="textfield-label">Label Textarea</span>
		</label>
	`
}

const Template: Story<TextifeldMultilineStory> = (args: TextifeldMultilineStory) => ({
	props: args,
	template: getTemplate(args)
});

export const Multiline = Template.bind({});
Multiline.args = {};
