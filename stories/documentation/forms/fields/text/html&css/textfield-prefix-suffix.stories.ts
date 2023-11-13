import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldPrefixSuffixStory {
}

export default {
	title: 'Documentation/Forms/Fields/TextField/HTML&CSS',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TextfieldPrefixSuffixStory): string {
	return `<div class="form-field">
	<label class="formLabel" id="IDlabel" for="ID">Label</label>
	<div class="textField">
		<span class="textField-prefix" id="IDprefix">
			<span class="textField-label-prefix-item">$</span>
		</span>
		<span class="textField-suffix" id="IDsuffix">
			<span class="textField-label-suffix-item" aria-label="euros par jour">€/j</span>
		</span>
		<div class="textField-input">
			<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDprefix IDlabel IDsuffix" aria-describedby="IDmessage" placeholder="Placeholder" aria-invalid="false" value="Value" />
		</div>
	</div>
</div>`;
}

const Template: StoryFn<TextfieldPrefixSuffixStory> = (args: TextfieldPrefixSuffixStory) => ({
	props: args,
	template: getTemplate(args),
});

export const PrefixSuffix = Template.bind({});
PrefixSuffix.args = { };
