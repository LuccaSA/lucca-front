import { Meta, Story } from '@storybook/angular';

interface TextfieldFilterStory {}

export default {
	title: 'Documentation/Forms/Textfield/Filter',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldFilterStory): string {
	return `
	<div class="filters">
	  <label class="textfield mod-filter">
	  	<input class="textfield-input" type="text" placeholder="placeholder">
	  	<span class="textfield-label">Label textfield</span>
	  </label>
	</div>
	`;
}

const Template: Story<TextfieldFilterStory> = (args: TextfieldFilterStory) => ({
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
