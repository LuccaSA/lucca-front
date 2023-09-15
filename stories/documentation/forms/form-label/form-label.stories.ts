import { Meta, Story } from '@storybook/angular';

interface FormLabelBasicStory {
	size: string;
	error: boolean;
	counter: boolean;
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
		counter: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: FormLabelBasicStory): string {
	const size = args.size ? ` ${args.size}` : '';
	const error = args.error ? ` is-error` : '';
	const counter = args.counter
		? `<span class="formLabel-counter">
	<span class="formLabel-counter-display" aria-hidden="true">0/20</span>
	<span class="formLabel-counter-alternative">
		Le texte fait 0 caractère de long.
		20 caractères sont autorisés.
	</span>
</span>`
		: ``;
	return `
		<label class="formLabel${size}${error}">
			<span class="formLabel-content">
				Text<sup class="formLabel-required" aria-hidden="true">*</sup><span aria-hidden="true" class="lucca-icon icon-helpOutline"></span>
			</span>
			${counter}
		</label>
	`;
}

const Template: Story<FormLabelBasicStory> = (args: FormLabelBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { size: false, error: false, counter: false };
