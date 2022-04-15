import { Meta, Story } from '@storybook/angular';

interface ActionBasicStory {
	mod: string;
	loading: boolean;
	disabled: boolean;
	small: boolean;
}

export default {
	title: 'Documentation/Actions/Action Icon/Basic',
	argTypes: {
		mod: {
			options: ['', 'mod-delete', 'mod-outlined', 'mod-invert'],
			control: {
				type: 'radio',
			}
		},
		loading: {
			control: {
				type: 'boolean',
			}
		},
		disabled: {
			control: {
				type: 'boolean',
			}
		},
		small: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: ActionBasicStory): string {
	const classes = [args.mod].filter(Boolean).join(' ');
	const attributes = args.disabled ? `disabled="disabled"` : '';
	const loading = args.loading ? `is-loading` : '';
	const small = args.small ? `mod-small` : '';
	let icon = "edit";
	let tooltip = "Modifier";
	if (args.mod === 'mod-delete') {
		icon = "trash";
		tooltip = "Supprimer";
	}

	return `
	<button type="button" class="actionIcon mod-delete ${classes} ${small} ${loading}" luTooltip="Modifier" ${attributes}>
		<span aria-hidden="true" class="lucca-icon icon-${icon}"></span>
		<span class="u-mask">Modifier</span>
	</button>

	`
}

const Template: Story<ActionBasicStory> = (args: ActionBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		:host {
			display: block;
		}`,
		args.mod === 'mod-invert'
			? ':host { background-color: #333333; margin: -30px -20px; padding: 30px 20px; }'
			: ''
	],
});

export const Basic = Template.bind({});
Basic.args = { mod: '', loading: false, small: '', disabled: false };
