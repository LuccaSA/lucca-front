import { Meta, StoryObj } from '@storybook/angular';

interface FormLabelErrorStory {
	size: string;
	error: boolean;
}

export default {
	title: 'Documentation/Forms/Form Label/HTML & CSS/Error',
	argTypes: {},
} as Meta;

function getTemplate(args: FormLabelErrorStory): string {
	return `<label class="formLabel is-error">Label<sup class="formLabel-required" aria-hidden="true">*</sup><span class="formLabel-info"><span aria-hidden="true" class="lucca-icon icon-signHelp"></span><span class="pr-u-mask">?</span></span></label>`;
}

const Template = (args: FormLabelErrorStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Error: StoryObj<FormLabelErrorStory> = {
	args: {},
	render: Template,
};
