import { Meta, Story } from '@storybook/angular';

interface ButtonBasic2Story {
	palette: string;
	state: string;
	block: boolean;
	type: string;
}

export default {
	title: 'Documentation/Actions/Button/Basic2',
	argTypes: {
		palette: {
			options: ['', 'palette-primary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
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

function getTemplate(args: ButtonBasic2Story): string {
	const classes = [args.state, args.palette].filter(Boolean).join(' ');
	const type = args.type !== '' ? 'type="' + args.type : '"';
	const block = args.block ? `mod-block` : '';

	return `<button ${type} class="button ${classes} ${block}">Bouton</button>`;
}

const Template: Story<ButtonBasic2Story> = (args: ButtonBasic2Story) => ({
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
	],
});

export const Basic2Button = Template.bind({});
Basic2Button.args = { state: '', palette: '', block: false, type: 'button' };
