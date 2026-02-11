import { Meta, StoryObj } from '@storybook/angular';

interface LoadingsBasicStory {
	label: boolean;
	block: boolean;
	L: boolean;
	invert: boolean;
	template: string;
}

export default {
	title: 'Documentation/Loaders/Loading/HTML&CSS/Basic',
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
			if: { arg: 'template', truthy: false },
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
			options: ['', 'mod-popin', 'mod-drawer', 'mod-fullPage'],
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

const Template = (args: LoadingsBasicStory) => ({
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

export const Basic: StoryObj<LoadingsBasicStory> = {
	args: { label: false, block: false, L: false, invert: false, template: '' },
	render: Template,
};
