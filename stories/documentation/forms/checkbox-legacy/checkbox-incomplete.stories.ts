import { Meta, Story } from '@storybook/angular';

interface CheckboxLegacyIncompleteStory {}

export default {
	title: 'Documentation/Forms/Checkboxes/Legacy/Incomplete',
	argTypes: {},
} as Meta;

function getTemplate(args: CheckboxLegacyIncompleteStory): string {
	return `
		<label class="checkboxLegacy">
			<input class="checkboxLegacy-input is-incomplete" type="checkbox" name="checkboxList1" checked>
			<span class="checkboxLegacy-label">Checkbox</span>
		</label>
	`;
}

const Template: Story<CheckboxLegacyIncompleteStory> = (args: CheckboxLegacyIncompleteStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Incomplete = Template.bind({});
Incomplete.args = {};
