import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldDisabledStory {}

export default {
	title: 'Documentation/Forms/Fields/TextField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldDisabledStory): string {
	return `<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" aria-describedby="IDmessage" placeholder="Placeholder" aria-invalid="false" disabled />
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

const Template: StoryFn<TextfieldDisabledStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Disabled = Template.bind({});
Disabled.args = {};
