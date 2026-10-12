import { IconsList } from '@/stories/icons-list';
import { TAG_SIZE, TagComponent } from '@lucca-front/ng/tag';
import { provideRouter, withHashLocation } from '@angular/router';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';
import { PaletteAllArgType } from '@/helpers/common-arg-types';
import { generateInputs, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Texts/Tags/Angular/Basic',
	component: TagComponent,
	decorators: [
		applicationConfig({
			providers: [provideRouter([{ path: '**', children: [] }], withHashLocation())],
		}),
	],
	render: (args, context) => {
		return {
			template: `<lu-tag${generateInputs(args, context.argTypes)} />`,
		};
	},
} as Meta;

export const Template: StoryObj<TagComponent> = {
	argTypes: {
		size: {
			options: setStoryOptions(TAG_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du tag.',
			table: { category: 'inputs' },
		},
		palette: { ...PaletteAllArgType, table: { category: 'inputs' } },
		outlined: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'AI', truthy: false },
			description: 'Applique un style secondaire au tag.',
			table: { category: 'inputs' },
		},
		icon: {
			options: IconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
			description: 'Ajoute une icône au tag.',
			table: { category: 'inputs' },
		},
		link: {
			control: {
				type: 'text',
			},
			description: 'Transforme le tag en lien vers la route indiquée (`routerLink`).',
			table: { category: 'inputs' },
		},
		AI: {
			description: '[v20.3] Applique les couleurs IA.',
			table: { category: 'inputs' },
		},
		withEllipsis: {
			description: '[v20.3] Ellipse le texte et ajoute une tooltip lorsque le label est trop long.',
			table: { category: 'inputs' },
		},
		label: {
			description: 'Modifie le texte affiché par le composant.',
			table: { category: 'inputs' },
		},
	},

	args: {
		label: 'Text',
		outlined: false,
		icon: null,
		withEllipsis: false,
		AI: false,
		link: '',
	},
};
