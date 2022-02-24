import { Meta, Story } from '@storybook/angular';

interface ButtonBasicStory {
	label: string;
	mod: string;
	palette: string;
	state: string;
	size: string;
	disabled: boolean;
}

export default {
	title: 'SCSS/Button/Basic',
	argTypes: {
		mod: {
			options: ['', ' mod-outline', 'mod-link', 'mod-link mod-invert'],
			control: {
				type: 'radio',
			}
		},
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'radio',
			}
		},
		state: {
			options: ['', 'is-loading', 'is-error', 'is-success', 'is-disabled'],
			control: {
				type: 'radio',
			}
		},
		size: {
			options: ['', 'mod-smaller', 'mod-small'],
			control: {
				type: 'radio',
			}
		},

	},
} as Meta;

function getTemplate(args: ButtonBasicStory): string {
	const classes = [args.mod, args.state, args.palette, args.size].filter(Boolean).join(' ');
	const attributes = args.disabled ? `disabled="disabled"` : '';

	return `
	<button class="button ${classes}" ${attributes}>${args.label}</button>

	<div class="button-group">
		<button class="button ${classes}" ${attributes}>${args.label}</button>
			<button class="button ${classes}" ${attributes}>${args.label}</button>
			<button class="button ${classes}" ${attributes}>${args.label}</button>
			<button class="button mod-more ${classes}" ${attributes}></button>
	</div>
	`
}

const Template: Story<ButtonBasicStory> = (args: ButtonBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		.button:first-of-type {
			display: block;
		}
		.button-group {
			margin-top: var(--spacings-standard)
		}`,
	],
});

export const Basic = Template.bind({});
Basic.args = { label: 'label', mod: '', size: '', state: '', palette: '', disabled: false };

