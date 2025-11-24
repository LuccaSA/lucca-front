import { IconsList } from '@lucca-front/icons/icons-list';
import { TagComponent } from '@lucca-front/ng/tag';
import { Meta, StoryObj } from '@storybook/angular';
import { HiddenArgType, PaletteAllArgType } from 'stories/helpers/common-arg-types';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Texts/Tags/Angular/Basic',
	component: TagComponent,
	render: (args, context) => {
		return {
			template: `<lu-tag${generateInputs(args, context.argTypes)} />`,
		};
	},
} as Meta;

export const Template: StoryObj<TagComponent> = {
	argTypes: {
		size: {
			options: ['S', 'M', 'L'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du tag.',
		},
		palette: PaletteAllArgType,
		outlined: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'AI', truthy: false },
			description: 'Applique un style secondaire au tag.',
		},
		icon: {
			options: IconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
			description: 'Ajoute une icône au tag.',
		},
		link: HiddenArgType,
		AI: {
			description: '[v20.3] Applique les couleurs IA.',
		},
		withEllipsis: {
			description: '[v20.3] Ellipse le texte et ajoute une tooltip lorsque le label est trop long.',
		},
		label: {
			description: 'Modifie le texte affiché par le composant.',
		},
	},

	args: {
		label: 'Text',
		palette: null,
		outlined: false,
		icon: null,
		withEllipsis: false,
		AI: false,
	},
};
