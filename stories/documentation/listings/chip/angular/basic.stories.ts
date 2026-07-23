import { IconsList } from '@/stories/icons-list';
import { CHIP_STATE, ChipComponent } from '@lucca-front/ng/chip';
import { LuccaIcon } from '@lucca-front/icons';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { setStoryOptions } from '@/helpers/stories';

interface ChipBasicStory {
	unkillable: boolean;
	disabled: boolean;
	product: boolean;
	withEllipsis: boolean;
	small: boolean;
	feedback: string;
	icon: LuccaIcon | null;
}

export default {
	title: 'Documentation/Listings/Chip/Angular/Basic',
	argTypes: {
		unkillable: {
			control: {
				type: 'boolean',
			},
			description: 'Rend le chip non supprimable.',
		},
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le composant.',
		},
		product: {
			control: {
				type: 'boolean',
			},
			description: 'Applique la palette product au composant.',
		},
		withEllipsis: {
			description: '[20.1] Ellipse le texte et ajoute une tooltip lorsque le label est trop long.',
		},
		small: {
			control: {
				type: 'boolean',
			},
			description: 'Modifie la taille du composant.',
		},
		feedback: {
			description: "[20.1] Donne une information sur l'état du composant.",
			options: setStoryOptions(CHIP_STATE),
			control: {
				type: 'select',
			},
		},
		icon: {
			options: IconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
			description: 'Ajoute une icône au chip.',
		},
		kill: {
			description: 'Événement déclenché lors du clic sur le bouton de suppression du chip.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [ChipComponent],
		}),
	],
} as Meta;

function getTemplate(args: ChipBasicStory): string {
	const unkillable = args.unkillable ? ` unkillable` : ``;
	const product = args.product ? ` palette="product"` : ``;
	const disabled = args.disabled ? ` disabled` : ``;
	const ellipsis = args.withEllipsis ? ` withEllipsis` : ``;
	const small = args.small ? ` size="S"` : ``;
	const feedback = args.feedback === 'warning' ? ` state="warning"` : args.feedback === 'critical' ? ` state="critical"` : ``;
	const icon = args.icon ? ` icon="${args.icon}"` : ``;
	return `<lu-chip${disabled}${unkillable}${product}${ellipsis}${small}${feedback}${icon}>Label</lu-chip>`;
}

const Template = (args: ChipBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ChipBasicStory> = {
	args: {
		unkillable: false,
		disabled: false,
		product: false,
		withEllipsis: false,
		small: false,
		feedback: '',
		icon: null,
	},
	render: Template,
};
