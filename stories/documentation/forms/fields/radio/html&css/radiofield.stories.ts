import { Meta, StoryFn } from '@storybook/angular';

interface RadioBasicStory {}

export default {
	title: 'Documentation/Forms/Fields/RadioField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: RadioBasicStory): string {
	return `
<div class="form-field">
	<label class="formLabel" for="IDradioA">Label A</label>
	<span class="radioField">
		<input type="radio" class="radioField-input" id="IDradioA" name="radioName1" aria-describedby="IDmessageRadioA" aria-required="true" />
		<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
	</span>
	<div class="inlineMessage" id="IDmessageRadioA">Helper text</div>
</div>
<div class="form-field">
	<label class="formLabel" for="IDradioB">Label B</label>
	<span class="radioField">
		<input type="radio" class="radioField-input" id="IDradioB" name="radioName1" aria-describedby="IDmessageRadioB" aria-required="true" />
		<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
	</span>
	<div class="inlineMessage" id="IDmessageRadioB">Helper text</div>
</div>
	`;
}

const Template: StoryFn<RadioBasicStory> = (args: RadioBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
