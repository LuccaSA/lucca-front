import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldValueAlignRightStory {}

export default {
	title: 'Documentation/Forms/Fields/TextField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldValueAlignRightStory): string {
	return `<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField mod-valueAlignRight">
		<div class="textField-input">
			<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" aria-describedby="IDmessage" placeholder="Placeholder" aria-invalid="false" />
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage"><span aria-hidden="true" class="lucca-icon inlineMessage-content-statusIcon"></span>Helper text</div>
</div>`;
}

const Template: StoryFn<TextfieldValueAlignRightStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const ValueAlignRight = Template.bind({});
ValueAlignRight.args = {};
