import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldSearchAndSuffixStory {}

export default {
	title: 'Documentation/Forms/Textfield/Search And Suffix',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldSearchAndSuffixStory): string {
	return `
		<label class="textfield mod-search">
			<input class="textfield-input" type="text" placeholder="Placeholder">
			<span class="textfield-label">Label</span>
		</label>
		<label class="textfield mod-withSuffix">
			<input class="textfield-input" type="text" placeholder="Placeholder">
			<span class="textfield-label">Label</span>
			<span class="textfield-suffix">€/j</span>
		</label>
	`;
}

const Template: StoryFn<TextfieldSearchAndSuffixStory> = (args: TextfieldSearchAndSuffixStory) => ({
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

export const SearchAndSuffix = Template.bind({});
SearchAndSuffix.args = {};
