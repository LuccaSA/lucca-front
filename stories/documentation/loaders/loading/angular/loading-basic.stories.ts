import { LOADING_SIZE, LoadingComponent } from '@lucca-front/ng/loading';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { cleanupTemplate, setStoryOptions } from '@/helpers/stories';

interface LoadingsBasicStory {
	label: string;
	hiddenLabel: boolean;
	size: string;
	block: boolean;
	invert: boolean;
	template: string;
}

export default {
	title: 'Documentation/Loaders/Loading/Angular/Basic',
	argTypes: {
		label: {
			description: '[Story] Modifie le texte affiché par le composant.',
			control: 'text',
			table: { category: 'story' },
		},
		hiddenLabel: {
			description: 'Masque le label en le conservant dans le DOM pour les lecteurs d’écrans.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		size: {
			description: 'Modifie la taille du loading. La taille L applique également automatiquement le mode block.',
			options: setStoryOptions(LOADING_SIZE),
			control: {
				type: 'select',
			},
			table: { category: 'inputs', type: { summary: 'LoadingSize | null' }, defaultValue: { summary: 'null' } },
		},
		block: {
			description: 'Centre le loading dans son conteneur pour une utilisation en pleine page, dialog, section, etc.',
			if: { arg: 'size', truthy: false },
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		invert: {
			description: 'Modifie les couleurs du loading pour un usage sur fond foncé.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		template: {
			description: 'Applique une mise en forme adaptée à certains contextes (pleine page, dialog, etc.).',
			options: ['', 'popin', 'drawer', 'fullPage'],
			control: {
				type: 'select',
			},
			table: { category: 'inputs', defaultValue: { summary: 'null' } },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [LoadingComponent],
		}),
	],
	render: (args: LoadingsBasicStory) => {
		const sizeParam = args.size ? ` size="${args.size}"` : ``;
		const blockParam = args.block ? ` block` : ``;
		const invertParam = args.invert ? ` invert` : ``;
		const hiddenLabelParam = args.hiddenLabel ? ` hiddenLabel` : ``;
		const templateParam = args.template ? ` template="${args.template}"` : ``;
		if (args.label) {
			return {
				template: cleanupTemplate(`<lu-loading${sizeParam}${hiddenLabelParam}${invertParam}${blockParam}${templateParam}>${args.label}</lu-loading>`),
			};
		} else {
			return {
				template: cleanupTemplate(`<lu-loading${sizeParam}${invertParam}${blockParam}${templateParam} />`),
			};
		}
	},
} as Meta;

export const Basic = {
	args: {
		label: 'Chargement…',
		hiddenLabel: true,
		size: '',
		block: false,
		invert: false,
		template: '',
	},
};
