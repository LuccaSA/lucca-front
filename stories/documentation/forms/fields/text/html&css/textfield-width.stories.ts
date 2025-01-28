import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldWidthStory {}

export default {
	title: 'Documentation/Forms/Fields/TextField/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: TextfieldWidthStory): string {
	return `<div class="form-field mod-width20">
	<label class="formLabel" id="ID20label" for="ID20">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input type="text" id="ID20" class="textField-input-value" aria-labelledby="ID20label" aria-describedby="ID20message" placeholder="Placeholder" aria-invalid="false" />
		</div>
	</div>
	<div class="inlineMessage" id="ID20message">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">
			Helper text
		</p>
	</div>
</div><br>
<div class="form-field mod-width30">
	<label class="formLabel" id="ID30label" for="ID30">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input type="text" id="ID30" class="textField-input-value" aria-labelledby="ID30label" aria-describedby="ID30message" placeholder="Placeholder" aria-invalid="false" />
		</div>
	</div>
	<div class="inlineMessage" id="ID30message">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">
			Helper text
		</p>
	</div>
</div><br>
<div class="form-field mod-width40">
	<label class="formLabel" id="ID40label" for="ID40">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input type="text" id="ID40" class="textField-input-value" aria-labelledby="ID40label" aria-describedby="ID40message" placeholder="Placeholder" aria-invalid="false" />
		</div>
	</div>
	<div class="inlineMessage" id="ID40message">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">
			Helper text
		</p>
	</div>
</div><br>
<div class="form-field mod-width50">
	<label class="formLabel" id="ID50label" for="ID50">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input type="text" id="ID50" class="textField-input-value" aria-labelledby="ID50label" aria-describedby="ID50message" placeholder="Placeholder" aria-invalid="false" />
		</div>
	</div>
	<div class="inlineMessage" id="ID50message">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">
			Helper text
		</p>
	</div>
</div><br>
<div class="form-field mod-width60">
	<label class="formLabel" id="ID60label" for="ID60">Label</label>
	<div class="textField">
		<div class="textField-input">
			<input type="text" id="ID60" class="textField-input-value" aria-labelledby="ID60label" aria-describedby="ID60message" placeholder="Placeholder" aria-invalid="false" />
		</div>
	</div>
	<div class="inlineMessage" id="ID60message">
		<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
		<p class="inlineMessage-content">
			Helper text
		</p>
	</div>
</div>`;
}

const Template: StoryFn<TextfieldWidthStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`.form-field {
			margin-bottom: var(--pr-t-spacings-200);
		}`,
	],
});

export const Width = Template.bind({});
Width.args = {};
