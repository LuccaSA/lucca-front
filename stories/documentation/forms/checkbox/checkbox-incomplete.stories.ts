import { Meta, Story } from '@storybook/angular';

interface CheckboxIncompleteStory {}

export default {
	title: 'Documentation/Forms/Checkboxes/Incomplete',
	argTypes: {},
} as Meta;

function getTemplate(args: CheckboxIncompleteStory): string {
	return `
		<label class="checkbox">
			<input class="checkbox-input is-incomplete" type="checkbox" name="checkboxList1" checked>
			<span class="checkbox-label">checkbox</span>
		</label>
	`;
}

const Template: Story<CheckboxIncompleteStory> = (args: CheckboxIncompleteStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Incomplete = Template.bind({});
Incomplete.args = {};
