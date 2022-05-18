import { Meta, Story } from '@storybook/angular';

interface ButtonBasicStory {
	mod: string;
	palette: string;
	state: string;
	size: string;
	disabled: boolean;
	noFlexWrap: boolean;
}

export default {
	title: 'Documentation/Actions/Button/Basic',
	argTypes: {
		mod: {
			options: ['', 'mod-outlined', 'mod-link', 'mod-link mod-invert', 'mod-icon'],
			control: {
				type: 'radio',
			},
		},
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'radio',
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
		noFlexWrap: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: ButtonBasicStory): string {
	const classes = [args.mod, args.state, args.palette, args.size].filter(Boolean).join(' ');
	const attributes = args.disabled ? `disabled="disabled"` : '';
	const noFlexWrap = args.noFlexWrap ? `u-flexWrapNowrap` : '';

	return `
	<button type="button" class="button ${classes}" ${attributes}>
		<span *ngIf="mod === 'mod-icon'" class="lucca-icon icon-star button-icon" aria-hidden="true"></span>
		Bouton
	</button>

	<ul class="button-group ${classes} ${noFlexWrap}" ${attributes}>
		<li class="button-group-item"><button type="button" class="button ${classes}" ${attributes}>Bouton</button></li>
		<li class="button-group-item"><button type="button" class="button ${classes}" ${attributes}>Bouton</button></li>
		<li class="button-group-item"><button type="button" class="button ${classes}" ${attributes}>Bouton</button></li>
		<li class="button-group-item">
			<button type="button" class="button ${classes} mod-more" ${attributes}>
				<span class="lucca-icon icon-chevronSouth" aria-hidden="true"></span>
				<span class="u-mask">Plus d'actions</span>
			</button>
		</li>
	</ul>
	`;
}

const Template: Story<ButtonBasicStory> = (args: ButtonBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`:host {
			display: block;
			margin: -1rem;
			padding: 1rem;
		}
		.button:first-of-type {
			display: block;
		}
		.button-group {
			margin-top: var(--spacings-standard)
		}`,
		args.mod === 'mod-link mod-invert' ? ':host { background-color: #333333 }' : '',
	],
});

export const Basic = Template.bind({});
Basic.args = { mod: '', size: '', state: '', palette: '', disabled: false, noFlexWrap: false };
