import { Meta, StoryFn } from '@storybook/angular';

interface ClearBasicStory {
	s: boolean;
	product: boolean;
	disabled: boolean;
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
	},
} as Meta;

function getTemplate(args: ClearBasicStory): string {
	const s = args.s ? `mod-S` : '';
	const product = args.product ? `palette-product` : '';
	const disabled = args.disabled ? `disabled` : '';
	return `<a href="#" class="clear ${s} ${product}" ${disabled}><span class="u-mask">Clear</span></a>`;
}

const Template: StoryFn<ClearBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { s: false, product: false, disabled: false };
