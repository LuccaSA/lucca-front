import { Meta, Story } from '@storybook/angular';

interface ActionBasicStory {
	mod: string;
	loading: boolean;
	disabled: boolean;
	size: boolean;
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
		size: {
			options: ['', 'mod-S', 'mod-XS'],
			control: {
				type: 'radio',
			}
		},
	},
} as Meta;

function getTemplate(args: ActionBasicStory): string {
	const classes = [args.mod, args.size].filter(Boolean).join(' ');
	const attributes = args.disabled ? `disabled="disabled"` : '';
	const loading = args.loading ? `is-loading` : '';
	let icon = 'heart';
	let tooltip = 'Modifier';
	if (args.mod === 'mod-delete') {
		icon = 'trash';
		tooltip = 'Supprimer';
	}

	return `
	<button type="button" class="actionIcon ${classes} ${loading}" luTooltip="Modifier" ${attributes}>
		<span aria-hidden="true" class="lucca-icon icon-${icon}"></span>
		<span class="u-mask">Modifier</span>
	</button>

	`;
}

const Template: Story<ActionBasicStory> = (args: ActionBasicStory) => ({
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
BasicAction.args = { mod: '', loading: false, size: '', disabled: false };
