import { Meta, StoryFn } from '@storybook/angular';

interface RadioBasicStory {}

export default {
	title: 'Documentation/Forms/Fields/RadioField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: RadioBasicStory): string {
	return `<fieldset class="form-fieldset">
	<legend class="formLabel">
		Label<sup class="formLabel-required" aria-hidden="true">*</sup>
	</legend>
	<div class="form-field">
		<label class="formLabel" for="IDradioA">Option A</label>
		<span class="radioField">
			<input type="radio" class="radioField-input" id="IDradioA" name="radioName1" aria-describedby="IDmessageRadioA" checked />
			<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
		</span>
		<div class="inlineMessage" id="IDmessageRadioA">
			<p class="inlineMessage-content">Option text</p>
		</div>
	</div>
	<div class="form-field">
		<label class="formLabel" for="IDradioB">Option B</label>
		<span class="radioField">
			<input type="radio" class="radioField-input" id="IDradioB" name="radioName1" aria-describedby="IDmessageRadioB" />
			<span class="radioField-icon" aria-hidden="true"><span class="radioField-icon-check"></span></span>
		</span>
		<div class="inlineMessage" id="IDmessageRadioB">
			<p class="inlineMessage-content">Option text</p>
		</div>
	</div>
</fieldset>`;
}

const Template: StoryFn<RadioBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
