import { Meta, StoryFn } from '@storybook/angular';

interface FormLabelBasicStory {}

export default {
	title: 'Documentation/Forms/Form Label Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: FormLabelBasicStory): string {
	return `<label class="formLabel">Label<sup class="formLabel-required" aria-hidden="true">*</sup><span class="formLabel-info"><span aria-hidden="true" class="lucca-icon icon-signHelp"></span><span class="u-mask">?</span></span></label>`;
}

const Template: StoryFn<FormLabelBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
