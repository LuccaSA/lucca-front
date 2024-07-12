import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldCounterStory {}

export default {
	title: 'Documentation/Forms/Fields/TextField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldCounterStory): string {
	return `
<div class="form-field">
	<label class="formLabel mod-counter" id="IDlabel" for="ID">
		Label
		<span class="formLabel-counter" id="IDcounter" aria-live="polite">
			<span aria-hidden="true">8/88</span>
			<span class="u-mask">
				Votre publication fait 8 caractères de long. 88 caractères maximum sont autorisés.
			</span>
		</span>
	</label>
	<div class="textField">
		<div class="textField-input">
			<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" aria-describedby="IDcounter IDmessage" placeholder="Placeholder" aria-invalid="false" />
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage"><span aria-hidden="true" class="inlineMessage-statusIcon"></span>Helper text</div>
</div>
`;
}

const Template: StoryFn<TextfieldCounterStory> = (args: TextfieldCounterStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Counter = Template.bind({});
Counter.args = {};
