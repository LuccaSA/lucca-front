import { Meta, StoryFn } from '@storybook/angular';

interface CheckboxMixedStory {
}

export default {
	title: 'Documentation/Forms/Fields/CheckboxField/HTML&CSS',
	argTypes: {
	},
} as Meta;

function getTemplate(args: CheckboxMixedStory): string {
	return `<div class="form-field">
	<label class="formLabel" for="ID">Label</label>
	<span class="checkboxField">
		<input type="checkbox" class="checkboxField-input" id="ID" aria-describedby="IDmessage" aria-required="true" aria-checked="mixed" checked />
		<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
	</span>
	<div class="inlineMessage" id="IDmessage">Helper text</div>
</div>`;
}

const Template: StoryFn<CheckboxMixedStory> = (args: CheckboxMixedStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Mixed = Template.bind({});
Mixed.args = { };
