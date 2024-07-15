import { Meta, StoryFn } from '@storybook/angular';

interface TextareaBasicStory {}

export default {
	title: 'Documentation/Forms/Fields/TextAreaField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: TextareaBasicStory): string {
	return `<div class="form-field">
		<label class="formLabel" id="IDlabel" for="ID">Label</label>
		<div class="textField">
			<div class="textField-input">
				<textarea rows="3" id="ID" class="textField-input-value" aria-labelledby="IDlabel" aria-describedby="IDmessage" placeholder="Placeholder" aria-invalid="false"></textarea>
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

const Template: StoryFn<TextareaBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
