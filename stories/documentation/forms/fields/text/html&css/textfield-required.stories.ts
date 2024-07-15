import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldRequiredStory {}

export default {
	title: 'Documentation/Forms/Fields/TextField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldRequiredStory): string {
	return `<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">Label<sup class="formLabel-required" aria-hidden="true">*</sup></label>
	<div class="textField">
		<div class="textField-input">
			<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" aria-describedby="IDmessage" placeholder="Placeholder" aria-invalid="false" aria-required="true" />
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage">
		<p class="inlineMessage-content">
			<span aria-hidden="true" class="lucca-icon inlineMessage-content-statusIcon"></span>
			Helper text
		</p>
	</div>
</div>`;
}

const Template: StoryFn<TextfieldRequiredStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Required = Template.bind({});
Required.args = {};
