import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldInfoStory {}

export default {
	title: 'Documentation/Forms/Fields/TextField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldInfoStory): string {
	return `<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">
		Label<span class="formLabel-info"><span aria-hidden="true" class="lucca-icon icon-signHelp"></span><span class="u-mask">?</span></span>
	</label>
	<div class="textField">
		<div class="textField-input">
			<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" aria-describedby="IDmessage" placeholder="Placeholder" aria-invalid="false" />
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage"
		<p class="inlineMessage-content">
			<span aria-hidden="true" class="lucca-icon inlineMessage-content-statusIcon"></span>
			Helper text
		</p>
	</div>
</div>`;
}

const Template: StoryFn<TextfieldInfoStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Info = Template.bind({});
Info.args = {};
