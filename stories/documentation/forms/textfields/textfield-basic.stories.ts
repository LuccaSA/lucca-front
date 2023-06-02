import { Meta, StoryFn } from '@storybook/angular';

interface TextfieldBasicStory {
	palette: string;
	display: string;
	style: string;
	width: string;
	size: string;
	noLabel: boolean;
	disabled: boolean;
	error: boolean;
	required: boolean;
	invert: boolean;
	white: boolean;
}

export default {
	title: 'Documentation/Forms/Textfield/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			},
		},
		display: {
			options: ['', 'mod-block', 'mod-inline'],
			control: {
				type: 'radio',
			},
		},
		style: {
			description: '<code>mod-outlined</code> & <code>mod-compact</code> can be combined.',
			options: ['', 'mod-compact', 'mod-material', 'mod-framed', 'mod-outlined'],
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
		white: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: TextfieldBasicStory): string {
	const classes = [args.palette, args.display, args.style, args.width].filter(Boolean).join(' ');
	const disabled = args.disabled ? `disabled` : '';
	const required = args.required ? `aria-required="true"` : '';
	const invert = args.invert ? `mod-invert` : '';
	const size = args.size;
	const noLabel = args.noLabel ? `mod-noLabel` : '';
	const white = args.white ? `mod-white` : '';
	const error = args.error ? `is-error` : '';
	return `
		<label class="textfield ${classes} ${size} ${noLabel} ${invert} ${white}">
			<input class="textfield-input ${error}" type="text" placeholder="placeholder" ${required} ${disabled}>
			<span class="textfield-label">Label textfield</span>
		</label>
	`;
}

const Template: StoryFn<TextfieldBasicStory> = (args: TextfieldBasicStory) => ({
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
Basic.args = { palette: '', display: '', style: '', noLabel: false, width: '', size: '', disabled: false, error: false, required: false, invert: false, white: false };
