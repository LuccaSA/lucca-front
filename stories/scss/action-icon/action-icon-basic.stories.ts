import { Meta, Story } from '@storybook/angular';

interface ActionBasicStory {
	mod: string;
	palette: string;
	loading: boolean;
	disabled: boolean;
}

export default {
	title: 'SCSS/Action Icon/Basic',
	argTypes: {
		mod: {
			options: ['', 'mod-invert'],
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
		loading: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: ActionBasicStory): string {
	const classes = [args.mod, args.palette].filter(Boolean).join(' ');
	const attributes = args.disabled ? `disabled="disabled"` : '';
	const loading = args.loading ? `is-loading` : '';

	return `
	<button type="button" class="actionIcon ${classes} ${loading}" luTooltip="Modifier" ${attributes}>
		<span aria-hidden="true" class="lucca-icon icon-edit"></span>
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
Basic.args = { mod: '', loading: false, palette: '', disabled: false };
