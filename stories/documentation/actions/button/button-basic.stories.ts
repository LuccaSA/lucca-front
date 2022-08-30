import { Meta, Story } from '@storybook/angular';

interface ButtonBasicStory {
	mod: string;
	palette: string;
	state: string;
	size: string;
	block: boolean;
	disabled: boolean;
}

export default {
	title: 'Documentation/Actions/Button/Basic',
	argTypes: {
		mod: {
			options: ['', 'mod-outlined', 'mod-text', 'mod-text mod-invert'],
			control: {
				type: 'radio',
			},
		},
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'select',
			},
		},
		state: {
			options: ['', 'is-loading', 'is-error', 'is-success', 'is-disabled'],
			control: {
				type: 'radio',
			},
		},
		size: {
			options: ['', 'mod-small', 'mod-smaller'],
			control: {
				type: 'radio',
			},
		},
		block: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: ButtonBasicStory): string {
	const classes = [args.mod, args.state, args.palette, args.size].filter(Boolean).join(' ');
	const attributes = args.disabled ? `disabled` : '';
	const block = args.block ? `mod-block` : '';

	return `
	<button class="button ${classes} ${block}" ${attributes}>Bouton</button>
	`;
}

const Template: Story<ButtonBasicStory> = (args: ButtonBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}
		.button:first-of-type {
			display: block;
		}
		.button-group {
			margin-top: var(--spacings-standard)
		}`,
		args.mod === 'mod-text mod-invert' ? ':host { background-color: #333333; margin: -15px -15px; padding: 15px 15px; }' : '',
	],
});

export const BasicButton = Template.bind({});
BasicButton.args = { mod: '', size: '', state: '', palette: '', block: false, disabled: false };
