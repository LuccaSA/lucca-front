import { Meta, StoryFn } from '@storybook/angular';

interface CheckboxDisabledStory {}

export default {
	title: 'Documentation/Forms/Fields/CheckboxField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: CheckboxDisabledStory): string {
	return `<div class="form-field">
	<label class="formLabel" for="ID">Label</label>
	<span class="checkboxField">
		<input type="checkbox" class="checkboxField-input" id="ID" aria-describedby="IDmessage" aria-required="true" disabled />
		<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
	</span>
	<div class="inlineMessage" id="IDmessage">
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>`;
}

const Template: StoryFn<CheckboxDisabledStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Disabled = Template.bind({});
Disabled.args = {};
