import { Meta, Story } from '@storybook/angular';

interface TextfieldClearableStory {}

export default {
	title: 'Documentation/Forms/Textfield/Clearable',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldClearableStory): string {
	return `
	<label class="textfield mod-clearable">
		<input class="textfield-input" type="text" placeholder="Placeholder">
		<span class="textfield-label">Label</span>
		<button class="clear textfield-clear">
		  <span aria-hidden="true" class="lucca-icon icon-close"></span>
		</button>
	</label>
	`;
}

const Template: Story<TextfieldClearableStory> = (args: TextfieldClearableStory) => ({
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

export const Clearable = Template.bind({});
Clearable.args = {};
