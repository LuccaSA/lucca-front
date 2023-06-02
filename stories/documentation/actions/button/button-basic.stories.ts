import { Meta, StoryFn } from '@storybook/angular';

interface ButtonBasicStory {
	style: string;
	palette: string;
	state: string;
	size: string;
	block: boolean;
	disabled: boolean;
	type: string;
}

export default {
	title: 'Documentation/Actions/Button/Basic',
	argTypes: {
		style: {
			options: ['', 'mod-outlined', 'mod-text', 'mod-text mod-invert'],
			control: {
				type: 'select',
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
				type: 'select',
			},
		},
		size: {
			options: ['', 'mod-S', 'mod-XS'],
			control: {
				type: 'select',
			},
		},
		block: {
			control: {
				type: 'boolean',
			},
		},
		type: {
			options: ['button', 'reset', 'submit'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: ButtonBasicStory): string {
	const classes = [args.style, args.state, args.palette, args.size].filter(Boolean).join(' ');
	const type = args.type !== '' ? 'type=' + args.type : '';
	const attributes = args.disabled ? `disabled` : '';
	const block = args.block ? `mod-block` : '';

	return `
	<button ${type} class="button ${classes} ${block}" ${attributes}>Bouton</button>
	`;
}

const Template: StoryFn<ButtonBasicStory> = (args: ButtonBasicStory) => ({
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
			margin-top: var(--spacings-M)
		}`,
		args.style === 'mod-text mod-invert' ? ':host { background-color: #333333; margin: -15px -15px; padding: 15px 15px; }' : '',
	],
});

export const BasicButton = Template.bind({});
BasicButton.args = { style: '', size: '', state: '', palette: '', block: false, disabled: false, type: 'button' };
