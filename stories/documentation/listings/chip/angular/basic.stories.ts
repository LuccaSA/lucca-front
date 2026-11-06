import { IconsList } from '@/stories/icons-list';
import { CHIP_SIZE, CHIP_STATE, ChipComponent, ChipSize, ChipState, luChipTranslations } from '@lucca-front/ng/chip';
import { LuccaIcon } from '@lucca-front/icons';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, intlArgType, setStoryOptions } from '@/helpers/stories';

interface ChipBasicStory {
	unkillable: boolean;
	disabled: boolean;
	palette: 'product' | '';
	withEllipsis: boolean;
	size: ChipSize | '';
	state: ChipState | '';
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
			table: { category: 'inputs' },
		},
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive le composant.',
			table: { category: 'inputs' },
		},
		palette: {
			options: ['', 'product'],
			control: {
				type: 'select',
			},
			description: 'Applique la palette product au composant. Seule la valeur <code>product</code> a un effet.',
			table: { category: 'inputs' },
		},
		withEllipsis: {
			control: {
				type: 'boolean',
			},
			description: '[20.1] Ellipse le texte et ajoute une tooltip lorsque le label est trop long.',
			table: { category: 'inputs' },
		},
		size: {
			options: setStoryOptions(CHIP_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs' },
		},
		state: {
			description: "[20.1] Donne une information sur l'état du composant.",
			options: setStoryOptions(CHIP_STATE),
			control: {
				type: 'select',
			},
			table: { category: 'inputs' },
		},
		icon: {
			options: IconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
			description: 'Ajoute une icône au chip.',
			table: { category: 'inputs' },
		},
		kill: {
			description: 'Événement déclenché lors du clic sur le bouton de suppression du chip.',
			action: 'kill',
			control: false,
			table: { category: 'outputs', type: { summary: 'Event' } },
		},
		intl: intlArgType(luChipTranslations, 'ChipTranslate'),
	},
	decorators: [
		moduleMetadata({
			imports: [ChipComponent],
		}),
	],
} as Meta;

export const Basic: StoryObj<ChipBasicStory> = {
	args: {
		unkillable: false,
		disabled: false,
		palette: '',
		withEllipsis: false,
		size: '',
		state: '',
		icon: null,
	},
	render: (args, { argTypes }) => ({
		props: args,
		template: `<lu-chip${generateInputs(args, argTypes)} (kill)="kill($event)">Label</lu-chip>`,
	}),
};
