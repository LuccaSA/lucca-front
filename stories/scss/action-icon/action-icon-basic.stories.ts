import { Meta, Story } from '@storybook/angular';

interface ActionBasicStory {
	mod: string;
	palette: string;
	state: string;
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
		state: {
			options: ['', 'is-loading'],
			control: {
				type: 'radio',
			}
		},
	},
} as Meta;

function getTemplate(args: ActionBasicStory): string {
	const classes = [args.mod, args.state, args.palette, args.size].filter(Boolean).join(' ');
	const attributes = args.disabled ? `disabled="disabled"` : '';

	return `
	<button type="button" class="actionIcon ${classes}" luTooltip="Modifier" ${attributes}>
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
Basic.args = { mod: '', state: '', palette: '', disabled: false };
