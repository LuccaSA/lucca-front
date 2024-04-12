import { Meta, StoryFn } from '@storybook/angular';

interface FormLabelErrorStory {
	size: string;
	error: boolean;
}

export default {
	title: 'Documentation/Forms/Form Label Error',
	argTypes: {
	},
} as Meta;

function getTemplate(args: FormLabelErrorStory): string {
	return `<label class="formLabel is-error">Label<sup class="formLabel-required" aria-hidden="true">*</sup><span aria-hidden="true" class="lucca-icon icon-signHelp"></span></label>`;
}

const Template: StoryFn<FormLabelErrorStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Error = Template.bind({});
Error.args = {};
