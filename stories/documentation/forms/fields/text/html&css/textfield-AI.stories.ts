import { Meta, StoryObj } from '@storybook/angular';

interface TextfieldAIStory {}

export default {
	title: 'Documentation/Forms/Fields/TextField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldAIStory): string {
	return `
<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="form-field-contentOptional">
		<div class="textField">
			<div class="textField-input">
				<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" aria-describedby="IDmessage" placeholder="Placeholder" aria-invalid="false" />
			</div>
		</div>
		<!-- tooltip here -->
		<span role="button" tabindex="0" aria-hidden="true" class="pr-u-focusVisible pr-u-borderRadiusSmall lucca-icon mod-AI mod-S icon-weatherStars"></span>
		<span class="pr-u-mask">Assistant IA</span>
	</div>
	<div class="inlineMessage" id="IDmessage">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">
			Helper text
		</p>
	</div>
</div>
`;
}

const Template = (args: TextfieldAIStory) => ({
	props: args,
	template: getTemplate(args),
});

export const AI: StoryObj<TextfieldAIStory> = {
	args: {},
	render: Template,
};
