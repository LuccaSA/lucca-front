import { LoadingComponent } from '@lucca-front/ng/loading';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface LoadingsBasicStory {
	label: string;
	L: boolean;
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
		},
		L: {
			description: 'Applique la taille L au loading. Applique également automatiquement le mode block.',
		},
		block: {
			description: 'Centre le loading dans son conteneur pour une utilisation en pleine page, dialog, section, etc.',
			if: { arg: 'L', truthy: false },
		},
		invert: {
			description: 'Modifie les couleurs du loading pour un usage sur fond foncé.',
		},
		template: {
			description: 'Applique une mise en forme adaptée à certains contextes (pleine page, dialog, etc.).',
			options: ['', 'popin', 'drawer', 'fullPage'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [LoadingComponent],
		}),
	],
	render: (args: LoadingsBasicStory) => {
		const lParam = args.L ? `size="L"` : ``;
		const blockParam = args.block ? `block` : ``;
		const invertParam = args.invert ? `invert` : ``;
		const templateParam = args.template ? `template="${args.template}"` : ``;
		const params = `${lParam} ${invertParam} ${blockParam} ${templateParam}`;
		if (args.label) {
			return {
				template: cleanupTemplate(`<lu-loading ${params}>${args.label}</lu-loading>`),
			};
		} else {
			return {
				template: cleanupTemplate(`<lu-loading ${params} />`),
			};
		}
	},
} as Meta;

export const Basic = {
	args: {
		label: '',
		L: false,
		block: false,
		invert: false,
		template: '',
	},
};
