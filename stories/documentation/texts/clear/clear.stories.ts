import { Meta, StoryObj } from '@storybook/angular';

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
			descripotion: 'Modifie la taille du bouton.',
		},
		product: {
			control: {
				type: 'boolean',
			},
			descripotion: 'Applique la palette product au bouton.',
		},
		disabled: {
			control: {
				type: 'boolean',
			},
			descripotion: 'Désactive le bouton.',
		},
		inverted: {
			control: {
				type: 'boolean',
			},
			description: 'Modifie les couleurs du bouton pour le placer sur fond foncé.',
		},
	},
} as Meta;

function getTemplate(args: ClearBasicStory): string {
	const s = args.s ? `mod-S` : '';
	const product = args.product ? `palette-product` : '';
	const disabled = args.disabled ? `disabled` : '';
	const inverted = args.inverted ? `mod-inverted` : '';
	return `<a href="#" class="clear ${s} ${inverted} ${product}" ${disabled}><span class="pr-u-mask">Clear</span></a>`;
}

const Template = (args: ClearBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ClearBasicStory> = {
	args: { s: false, product: false, disabled: false, inverted: false },
	render: Template,
};
