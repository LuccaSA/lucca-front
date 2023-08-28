import { Meta, StoryFn } from '@storybook/angular';

interface CheckboxIncompleteStory {}

export default {
	title: 'Documentation/Forms/Checkbox Legacy/Incomplete',
	argTypes: {},
} as Meta;

function getTemplate(args: CheckboxIncompleteStory): string {
	return `
		<label class="checkbox">
			<input class="checkbox-input is-incomplete" type="checkbox" name="checkboxList1" checked>
			<span class="checkbox-label">Checkbox</span>
		</label>
	`;
}

const Template: StoryFn<CheckboxIncompleteStory> = (args: CheckboxIncompleteStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Incomplete = Template.bind({});
Incomplete.args = {};
