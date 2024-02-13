import { Meta, StoryFn } from '@storybook/angular';

interface RadioSizeStory {}

export default {
	title: 'Documentation/Forms/Fields/RadioField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: RadioSizeStory): string {
	return `
<fieldset class="form-fieldset">
	<legend class="formLabel">
		Text<sup class="formLabel-required" aria-hidden="true">*</sup>
	</legend>
	<div class="form-field mod-S">
		<label class="formLabel" for="IDradioA">Label A</label>
		<span class="radioField">
			<input type="radio" class="radioField-input" id="IDradioA" name="radioName1" aria-describedby="IDmessageRadioA" checked />
			<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
		</span>
		<div class="inlineMessage" id="IDmessageRadioA">Helper text</div>
	</div>
	<div class="form-field mod-S">
		<label class="formLabel" for="IDradioB">Label B</label>
		<span class="radioField">
			<input type="radio" class="radioField-input" id="IDradioB" name="radioName1" aria-describedby="IDmessageRadioB" />
			<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
		</span>
		<div class="inlineMessage" id="IDmessageRadioB">Helper text</div>
	</div>
</fieldset>
	`;
}

const Template: StoryFn<RadioSizeStory> = (args: RadioSizeStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Size = Template.bind({});
Size.args = {};
