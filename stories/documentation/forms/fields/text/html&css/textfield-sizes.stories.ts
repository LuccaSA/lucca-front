import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldSizeStory {
	size: string;
}

export default {
	title: 'Documentation/Forms/Fields/TextField/HTML&CSS',
	argTypes: {
		size: {
			options: ['', 'mod-S', 'mod-XS'],
			control: {
				type: 'radio',
			},
		},
	},
} as Meta;

function getTemplate(args: TextfieldSizeStory): string {
	const size = ' '+args.size;
	return `<div class="form-field${size}">
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
});

export const Size = Template.bind({});
Size.args = { size: 'mod-S' };
