import { Meta, StoryObj } from '@storybook/angular';

interface LoadingsBasicStory {
	label: string;
	hiddenLabel: boolean;
	block: boolean;
	L: boolean;
	invert: boolean;
	template: string;
}

export default {
	title: 'Documentation/Loaders/Loading/HTML&CSS/Basic',
	argTypes: {
		label: {
			description: '[Story] Modifie le texte affiché par le composant.',
			control: 'text',
		},
		hiddenLabel: {
			description: "Masque le label en le conservant dans le DOM pour les lecteurs d'écran.",
		},
		L: {
			description: 'Applique la taille L au loading. Applique également automatiquement le mode block.',
		},
		block: {
			description: 'Centre le loading dans son conteneur pour une utilisation en pleine page, dialog, section, etc.',
			control: {
				type: 'boolean',
			},
			if: { arg: 'L', truthy: false },
		},
		invert: {
			description: 'Modifie les couleurs du loading pour un usage sur fond foncé.',
		},
		template: {
			description: 'Applique une mise en forme adaptée à certains contextes (pleine page, dialog, etc.).',
			options: ['', 'mod-popin', 'mod-drawer', 'mod-fullPage'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: LoadingsBasicStory): string {
	const block = args.block ? ` mod-block` : '';
	const L = args.L ? ` mod-L` : '';
	const invert = args.invert ? ` mod-invert` : '';
	const hiddenLabel = args.hiddenLabel ? ` mod-hiddenLabel` : '';

	return `<div class="loading${hiddenLabel}${block}${L}${invert}${args.template}">
	<span class="loading-label">${args.label}</span>
</div>
	`;
}

const Template = (args: LoadingsBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}`,
		args.invert === true ? ':host { background-color: #333333;  }' : '',
	],
});

export const Basic: StoryObj<LoadingsBasicStory> = {
	args: { label: 'Chargement…', hiddenLabel: true, block: false, L: false, invert: false, template: '' },
	render: Template,
};
