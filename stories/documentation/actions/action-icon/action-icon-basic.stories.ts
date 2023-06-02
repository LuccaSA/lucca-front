import { Meta, StoryFn } from '@storybook/angular';

interface ActionBasicStory {
	mod: string;
	loading: boolean;
	disabled: boolean;
	s: boolean;
}

export default {
	title: 'Documentation/Actions/Action Icon/Basic',
	argTypes: {
		mod: {
			options: ['', 'mod-delete', 'mod-outlined', 'mod-invert'],
			control: {
				type: 'radio',
			},
		},
		loading: {
			control: {
				type: 'boolean',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Small',
		},
	},
} as Meta;

function getTemplate(args: ActionBasicStory): string {
	const classes = [args.mod].filter(Boolean).join(' ');
	const attributes = args.disabled ? `disabled="disabled"` : '';
	const loading = args.loading ? `is-loading` : '';
	const s = args.s ? `mod-S` : '';
	let icon = 'edit';
	let tooltip = 'Modifier';
	if (args.mod === 'mod-delete') {
		icon = 'trash';
		tooltip = 'Supprimer';
	}

	return `
	<button type="button" class="actionIcon ${classes} ${s} ${loading}" luTooltip="Modifier" ${attributes}>
		<span aria-hidden="true" class="lucca-icon icon-${icon}"></span>
		<span class="u-mask">Modifier</span>
	</button>

	`;
}

const Template: StoryFn<ActionBasicStory> = (args: ActionBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}`,
		args.mod === 'mod-invert' ? ':host { background-color: #333333; margin: -15px -15px; padding: 15px 15px; }' : '',
	],
});

export const BasicAction = Template.bind({});
BasicAction.args = { mod: '', loading: false, s: '', disabled: false };
