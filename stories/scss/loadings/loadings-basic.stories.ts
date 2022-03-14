import { Meta, Story } from '@storybook/angular';

interface LoadingsBasicStory {
	label: boolean;
	block: boolean;
	big: boolean;
	invert: boolean;
}

export default {
	title: 'SCSS/Loadings/Basic',
	argTypes: {
		label: {
			control: {
				type: 'boolean',
			}
		},
		block: {
			control: {
				type: 'boolean',
			}
		},
		 big: {
			control: {
				type: 'boolean',
			}
		},
		invert: {
		 control: {
			 type: 'boolean',
		 }
	 },
	},
} as Meta;

function getTemplate(args: LoadingsBasicStory): string {
	const label = args.label ? `Loading…` : '';
	const block = args.block ? `mod-block` : '';
	const big = args.big ? `mod-big` : '';
	const invert = args.invert ? `mod-invert` : '';
	return `
	<div class="loading ${block} ${big} ${invert}">${label}</div>
	`
}

const Template: Story<LoadingsBasicStory> = (args: LoadingsBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		:host {
			display: block;
			min-height: 100px;
		}`,
		args.invert === true
			? ':host { background-color: #333333; margin: -30px -20px; padding: 30px 20px; }'
			: ''
	],
});

export const Basic = Template.bind({});
Basic.args = { label: false, block: false, big: false, invert: false };
