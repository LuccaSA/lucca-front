import { Meta, StoryFn } from '@storybook/angular';

interface CheckboxInvalidStory {}

export default {
	title: 'Documentation/Forms/Fields/CheckboxField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: CheckboxInvalidStory): string {
	return `<div class="form-field">
	<label class="formLabel" for="ID">Label</label>
	<span class="checkboxField">
		<input type="checkbox" class="checkboxField-input" id="ID" aria-describedby="IDmessage" aria-required="true" aria-invalid="true" />
		<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
	</span>
	<div class="inlineMessage" id="IDmessage">
		<p class="inlineMessage-content">Helper text</p>
	</div>
</div>`;
}

const Template: StoryFn<CheckboxInvalidStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Invalid = Template.bind({});
Invalid.args = {};
