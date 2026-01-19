import { Meta, StoryObj } from '@storybook/angular';

interface FormLabelBasicStory {}

export default {
	title: 'Documentation/Forms/Form Label Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: FormLabelBasicStory): string {
	return `<label class="formLabel">
	Label<sup class="formLabel-required" aria-hidden="true">*</sup>
	<span class="formLabel-info">
		<span aria-hidden="true" class="lucca-icon icon-signHelp"></span>
		<span class="pr-u-mask">?</span>
	</span>
	<span class="formLabel-tag tag">Tag</span>
</label>`;
}

const Template = (args: FormLabelBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<FormLabelBasicStory> = {
	args: {},
	render: Template,
};
