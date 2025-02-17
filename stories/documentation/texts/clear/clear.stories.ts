import { Meta, StoryFn } from '@storybook/angular';

interface ClearBasicStory {
	s: boolean;
	product: boolean;
	disabled: boolean;
	inverted: boolean;
}

export default {
	title: 'Documentation/Texts/Clear/Basic',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
		},
		product: {
			control: {
				type: 'boolean',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		inverted: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: ClearBasicStory): string {
	const s = args.s ? `mod-S` : '';
	const product = args.product ? `palette-product` : '';
	const disabled = args.disabled ? `disabled` : '';
	const inverted = args.inverted ? `mod-inverted` : '';
	return `<a href="#" class="clear ${s} ${inverted} ${product}" ${disabled}><span class="u-mask">Clear</span></a>`;
}

const Template: StoryFn<ClearBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { s: false, product: false, disabled: false, inverted: false };
