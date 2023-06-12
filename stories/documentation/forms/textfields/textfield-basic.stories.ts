import { Meta, Story } from '@storybook/angular';

interface TextfieldBasicStory {
	display: string;
	style: string;
	width: string;
	size: string;
	noLabel: boolean;
	disabled: boolean;
	error: boolean;
	required: boolean;
	invert: boolean;
}

export default {
	title: 'Documentation/Forms/Textfield/Basic',
	argTypes: {
		display: {
			options: ['', 'mod-block', 'mod-inline'],
			control: {
				type: 'radio',
			},
		},
		style: {
			options: ['', 'mod-compact', 'mod-material', 'mod-framed'],
			control: {
				type: 'select',
			},
		},
		width: {
			options: ['', 'mod-shortest', 'mod-shorter', 'mod-short', 'mod-standard', 'mod-long', 'mod-longer', 'mod-longest'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['', 'mod-S', 'mod-XS'],
			control: {
				type: 'select',
			},
		},
		noLabel: {
			description: "Une fois combiné à <code>mod-material</code>, permet d'intégrer un champs de saisie dans une phrase.",
			control: {
				type: 'boolean',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		error: {
			control: {
				type: 'boolean',
			},
		},
		required: {
			control: {
				type: 'boolean',
			},
		},
		invert: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: TextfieldBasicStory): string {
	const classes = [args.display, args.style, args.width].filter(Boolean).join(' ');
	const disabled = args.disabled ? `disabled` : '';
	const required = args.required ? `aria-required="true"` : '';
	const invert = args.invert ? `mod-invert` : '';
	const size = args.size;
	const noLabel = args.noLabel ? `mod-noLabel` : '';
	const error = args.error ? `is-error` : '';
	return `
		<label class="textfield ${classes} ${size} ${noLabel} ${invert}">
			<input class="textfield-input ${error}" type="text" placeholder="Placeholder" ${required} ${disabled}>
			<span class="textfield-label">Label</span>
		</label>
	`;
}

const Template: Story<TextfieldBasicStory> = (args: TextfieldBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}`,
		args.invert === true ? ':host { background-color: #333333; margin: -15px -15px; padding: 15px 15px; }' : '',
	],
});

export const Basic = Template.bind({});
Basic.args = { display: '', style: '', noLabel: false, width: '', size: '', disabled: false, error: false, required: false, invert: false, };
