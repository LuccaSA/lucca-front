import { Meta, StoryObj } from '@storybook/angular';

interface CheckboxOptionStory {}

export default {
	title: 'Documentation/Forms/Fields/CheckboxField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: CheckboxOptionStory): string {
	return `<div class="form-field mod-selectOption">
	<label class="formLabel" for="ID0">Label</label>
	<span class="checkboxField">
		<input type="checkbox" class="checkboxField-input" id="ID0" aria-required="true" disabled="disabled" />
		<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
	</span>
</div><div class="form-field mod-selectOption">
	<label class="formLabel" for="ID1">Label</label>
	<span class="checkboxField">
		<input type="checkbox" class="checkboxField-input" id="ID1" aria-required="true" />
		<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
	</span>
</div>
<div class="form-field mod-selectOption">
	<label class="formLabel" for="ID2">Label</label>
	<span class="checkboxField">
		<input type="checkbox" class="checkboxField-input" id="ID2" aria-required="true" checked="checked" />
		<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
	</span>
</div>
<div class="form-field mod-selectOption">
	<label class="formLabel" for="ID4">Label</label>
	<span class="checkboxField">
		<input type="checkbox" class="checkboxField-input" id="ID4" aria-required="true" aria-checked="mixed" checked="checked" />
		<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
	</span>
</div>
<div class="form-field mod-selectOption">
	<label class="formLabel" for="ID5">Label</label>
	<span class="checkboxField">
		<input type="checkbox" class="checkboxField-input" id="ID5" aria-required="true" aria-invalid="true" checked="checked" />
		<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
	</span>
</div>
`;
}

const Template = (args: CheckboxOptionStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Option: StoryObj<CheckboxOptionStory> = {
	args: {},
	render: Template,
};
