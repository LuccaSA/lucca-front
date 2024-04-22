import { Meta, StoryFn } from '@storybook/angular';

interface FormLabelSizeStory {
}

export default {
	title: 'Documentation/Forms/Form Label Size',
	argTypes: {
	},
} as Meta;

function getTemplate(args: FormLabelSizeStory): string {
	return `<label class="formLabel mod-S">Label<sup class="formLabel-required" aria-hidden="true">*</sup><span aria-hidden="true" class="lucca-icon icon-signHelp"></span></label>
<label class="formLabel mod-XS">Label<sup class="formLabel-required" aria-hidden="true">*</sup><span aria-hidden="true" class="lucca-icon icon-signHelp"></span></label>`;
}

const Template: StoryFn<FormLabelSizeStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Size = Template.bind({});
Size.args = {};
