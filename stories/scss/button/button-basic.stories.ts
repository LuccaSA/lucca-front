import { Meta, Story } from '@storybook/angular';

interface ButtonBasicStory {
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
			options: ['', 'mod-outline', 'mod-link', 'mod-link mod-invert'],
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
	<button class="button ${classes}" ${attributes}>Bouton</button>

	<div class="button-group">
		<button class="button ${classes}" ${attributes}>Bouton</button>
		<button class="button ${classes}" ${attributes}>Bouton</button>
		<button class="button ${classes}" ${attributes}>Bouton</button>
		<button class="button mod-more ${classes}" ${attributes}></button>
	</div>
	`
}

const Template: Story<ButtonBasicStory> = (args: ButtonBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		:host {
			display: block;
		}
		.button:first-of-type {
			display: block;
		}
		.button-group {
			margin-top: var(--spacings-standard)
		}`,
		args.mod === 'mod-link mod-invert'
			? ':host { background-color: #333333; margin: -30px -20px; padding: 30px 20px; }'
			: ''
	],
});

export const Basic = Template.bind({});
Basic.args = { mod: '', size: '', state: '', palette: '', disabled: false };
