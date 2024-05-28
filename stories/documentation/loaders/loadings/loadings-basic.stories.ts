import { Meta, StoryFn } from '@storybook/angular';

interface LoadingsBasicStory {
	label: boolean;
	block: boolean;
	L: boolean;
	invert: boolean;
	template: string;
}

export default {
	title: 'Documentation/Loaders/Loadings/Basic',
	argTypes: {
		label: {
			control: {
				type: 'boolean',
			},
		},
		block: {
			control: {
				type: 'boolean',
			},
		},
		L: {
			control: {
				type: 'boolean',
			},
		},
		invert: {
			control: {
				type: 'boolean',
			},
		},
		template: {
			options: ['', 'mod-popin', 'mod-drawer', 'mod-fullpage'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: LoadingsBasicStory): string {
	const label = args.label ? `Loading…` : '';
	const block = args.block ? `mod-block` : '';
	const L = args.L ? `mod-L` : '';
	const invert = args.invert ? `mod-invert` : '';

	return `
	<div class="loading ${block} ${L} ${invert} ${args.template}">${label}</div>
	`;
}

const Template: StoryFn<LoadingsBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}`,
		args.invert === true ? ':host { background-color: #333333;  }' : '',
	],
});

export const Basic = Template.bind({});
Basic.args = { label: false, block: false, L: false, invert: false, template: '' };
