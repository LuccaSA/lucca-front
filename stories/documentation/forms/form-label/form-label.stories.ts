import { Meta, StoryFn } from '@storybook/angular';

interface FormLabelBasicStory {
	size: string;
	error: boolean;
}

export default {
	title: 'Documentation/Forms/Form Label',
	argTypes: {
		size: {
			options: ['', 'mod-S', 'mod-XS'],
			control: {
				type: 'select',
			},
		},
		error: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: FormLabelBasicStory): string {
	const size = args.size ? ` ${args.size}` : '';
	const error = args.error ? ` is-error` : '';
	return `<label class="formLabel${size}${error}">Text<sup class="formLabel-required" aria-hidden="true">*</sup><span aria-hidden="true" class="lucca-icon icon-signHelp"></span></label>`;
}

const Template: StoryFn<FormLabelBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { size: false, error: false };
