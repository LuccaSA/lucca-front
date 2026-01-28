import { Meta, StoryObj } from '@storybook/angular';

interface FormLabelSizeStory {}

export default {
	title: 'Documentation/Forms/Form Label/HTML & CSS/Size',
	argTypes: {},
} as Meta;

function getTemplate(args: FormLabelSizeStory): string {
	return `<label class="formLabel mod-S">Label<sup class="formLabel-required" aria-hidden="true">*</sup><span class="formLabel-info"><span aria-hidden="true" class="lucca-icon icon-signHelp"></span><span class="pr-u-mask">?</span></span></label>
<label class="formLabel mod-XS">Label<sup class="formLabel-required" aria-hidden="true">*</sup><span class="formLabel-info"><span aria-hidden="true" class="lucca-icon icon-signHelp"></span><span class="pr-u-mask">?</span></span></label>`;
}

const Template = (args: FormLabelSizeStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Size: StoryObj<FormLabelSizeStory> = {
	args: {},
	render: Template,
};
