import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldFilterStory {}

export default {
	title: 'Documentation/Forms/Textfield Legacy/Filter',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldFilterStory): string {
	return `<div class="filters">
  <label class="textfield mod-filter">
  	<input class="textfield-input" type="text" placeholder="Placeholder">
  	<span class="textfield-label">Label</span>
  </label>
</div>`;
}

const Template: StoryFn<TextfieldFilterStory> = (args) => ({
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

export const Filter = Template.bind({});
Filter.args = {};
