import { BoxComponent, luBoxTranslations } from '@lucca-front/ng/box';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, generateInputs, intlArgType } from '@/helpers/stories';

export default {
	title: 'Documentation/Structure/Box/Angular/Basic',
	argTypes: {
		neutral: {
			description: 'Applique un fond gris.',
			table: { category: 'inputs' },
		},
		killable: {
			description: 'Ajoute un bouton de fermeture.',
			table: { category: 'inputs' },
		},
		toggle: {
			description: 'Applique le style « toggle » (classe <code>mod-toggle</code>, dépréciée). Préférer <code>withArrow</code>.',
			table: { category: 'inputs' },
		},
		withArrow: {
			description: 'Ajoute une flèche pointant vers le champ placé au-dessus de la box (voir la story Arrow).',
			table: { category: 'inputs' },
		},
		killed: {
			description: 'Événement déclenché lorsque la box est fermée.',
			action: 'killed',
			// `output()` sans type émet `void` (aucune valeur).
			// Pour un `output<T>()`, reprendre `T` ici (ex. `'string'`, `'FileList'`…).
			table: { category: 'outputs', type: { summary: 'void' } },
			control: false,
		},
		intl: intlArgType(luBoxTranslations, 'LuBoxLabel'),
	},
	decorators: [
		moduleMetadata({
			imports: [BoxComponent],
		}),
	],
	render: ({ killed, ...args }, { argTypes }) => {
		return {
			props: {
				...args,
				onKilled: () => killed?.(),
			},
			template: cleanupTemplate(`<lu-box ${generateInputs(args, argTypes)} (killed)="onKilled()">Lorem ipsum dolor sit amet</lu-box>`),
		};
	},
} as Meta;

export const Basic: StoryObj<BoxComponent> = {
	args: {
		neutral: false,
		killable: false,
		toggle: false,
		withArrow: false,
	},
};
