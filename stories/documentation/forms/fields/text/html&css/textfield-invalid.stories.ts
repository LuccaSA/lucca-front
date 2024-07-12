import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldInvalidStory {}

export default {
	title: 'Documentation/Forms/Fields/TextField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldInvalidStory): string {
	return `<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" aria-describedby="IDmessage" placeholder="Placeholder" aria-invalid="true" />
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage"><span aria-hidden="true" class="lucca-icon inlineMessage-content-statusIcon"></span>Error message</div>
</div>`;
}

const Template: StoryFn<TextfieldInvalidStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Invalid = Template.bind({});
Invalid.args = {};
