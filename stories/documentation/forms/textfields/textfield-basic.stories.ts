import { Meta, Story } from '@storybook/angular';

interface TextifeldBasicStory {
	palette: string;
	display: string;
	style: string;
	size: string;
	disabled: boolean;
	error: boolean;
	required: boolean;
	invert: boolean;
}

export default {
	title: 'Documentation/Forms/Textifeld/Basic',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'radio',
			}
		},
		display: {
			options: ['', 'mod-block', 'mod-inline'],
			control: {
				type: 'radio',
			}
		},
		style: {
			options: ['', 'mod-compact', 'mod-material', 'mod-framed'],
			control: {
				type: 'radio',
			}
		},
		size: {
			options: ['', 'mod-shortest', 'mod-shorter', 'mod-short', 'mod-standard', 'mod-long', 'mod-longer', 'mod-longest'],
			control: {
				type: 'radio',
			}
		},
		disabled: {
			control: {
				type: 'boolean',
			}
		},
		error: {
			control: {
				type: 'boolean',
			}
		},
		required: {
			control: {
				type: 'boolean',
			}
		},
		invert: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: TextifeldBasicStory): string {
	const classes = [args.palette, args.display, args.style, args.size].filter(Boolean).join(' ');
	const disabled = args.disabled ? `disabled` : '';
	const required = args.required ? `aria-required="true"` : '';
	const invert = args.invert ? `mod-invert` : '';
	const error = args.error ? `is-error` : '';
	return `
		<label class="textfield ${classes} ${invert}">
			<input class="textfield-input ${error}" type="text" placeholder="placeholder" ${required} ${disabled}>
			<span class="textfield-label">Label textfield</span>
		</label>
	`
}

const Template: Story<TextifeldBasicStory> = (args: TextifeldBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		:host {
			display: block;
		}`,
		args.invert === true
			? ':host { background-color: #333333; margin: -30px -20px; padding: 30px 20px; }'
		: ''
	],
});

export const Basic = Template.bind({});
Basic.args = { palette: '', display: '', style: '', size: '', disabled: false, error: false, required: false, invert: false };
