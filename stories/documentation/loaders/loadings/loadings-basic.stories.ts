import { Meta, Story } from '@storybook/angular';

interface LoadingsBasicStory {
	label: boolean;
	block: boolean;
	big: boolean;
	invert: boolean;
	fullpage: boolean;
	dialog: boolean;
	sidepanel: boolean;
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
		big: {
			control: {
				type: 'boolean',
			},
		},
		invert: {
			control: {
				type: 'boolean',
			},
		},
		fullpage: {
			control: {
				type: 'boolean',
			},
		},
		dialog: {
			control: {
				type: 'boolean',
			},
		},
		sidepanel: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: LoadingsBasicStory): string {
	const label = args.label ? `Loading…` : '';
	const block = args.block ? `mod-block` : '';
	const big = args.big ? `mod-big` : '';
	const invert = args.invert ? `mod-invert` : '';
	const fullpage = args.fullpage ? `mod-fullpage` : '';
	const dialog = args.dialog ? `mod-dialog` : '';
	const sidepanel = args.sidepanel ? `mod-sidePanel` : '';
	return `
	<div class="loading ${block} ${big} ${invert} ${fullpage} ${dialog} ${sidepanel}">${label}</div>
	`;
}

const Template: Story<LoadingsBasicStory> = (args: LoadingsBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
			min-height: 100px;
		}`,
		args.invert === true ? ':host { background-color: #333333; min-height: 130px; margin: -15px -15px; padding: 15px 15px; }' : '',
	],
});

export const Basic = Template.bind({});
Basic.args = { label: false, block: false, big: false, invert: false, fullpage: false, dialog: false, sidepanel: false };
