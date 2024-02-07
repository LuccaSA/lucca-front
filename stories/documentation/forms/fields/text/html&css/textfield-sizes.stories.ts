import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldSizeStory {
}

export default {
	title: 'Documentation/Forms/Fields/TextField/HTML&CSS',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TextfieldSizeStory): string {
	return `<div class="form-field mod-S">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" aria-describedby="IDmessage" placeholder="Placeholder" aria-invalid="false" />
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage"><span aria-hidden="true" class="lucca-icon"></span>Helper text</div>
</div>
<div class="form-field mod-XS">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" aria-describedby="IDmessage" placeholder="Placeholder" aria-invalid="false" />
		</div>
	</div>
	<div class="inlineMessage" id="IDmessage"><span aria-hidden="true" class="lucca-icon"></span>Helper text</div>
</div>`;
}

const Template: StoryFn<TextfieldSizeStory> = (args: TextfieldSizeStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`.form-field {
			margin-bottom: var(--pr-t-spacings-M);
		}`,
	],
});

export const Size = Template.bind({});
Size.args = { };
