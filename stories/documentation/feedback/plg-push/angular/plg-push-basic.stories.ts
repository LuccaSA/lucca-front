import { IconComponent } from '@lucca-front/ng/icon';
import { LuPlgPushTranslations, PLGPushComponent } from '@lucca-front/ng/plg-push';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, intlArgType } from '@/helpers/stories';

export default {
	title: 'Documentation/Feedback/PLG Push/Angular/Basic',
	component: PLGPushComponent,
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
	render: (args, context) => {
		const { removed, removedChange, ...inputs } = args;
		return {
			props: { removed, removedChange },
			template: `<lu-plg-push ${generateInputs(inputs, context.argTypes)} [(removed)]="removed" (removedChange)="removedChange($event)">
	Bénéficiez de toutes les options liées au télétravail avec Timmi Office.
	<a class="link mod-icon" href="#" target="_blank" rel="noopener noreferrer">
		<span class="link-text">Demander un essai gratuit</span><!-- no text node here --><span class="link-icon"><lu-icon class="pr-u-displayContents" icon="arrowExternal" alt="Ouvrir dans une nouvelle fenêtre" /></span>
	</a>
</lu-plg-push>`,
		};
	},
	argTypes: {
		heading: {
			type: 'string',
			description: 'Ajoute un titre au composant.',
			table: { category: 'inputs', defaultValue: { summary: '' } },
		},
		removable: {
			control: {
				type: 'boolean',
			},
			description: 'Rend le composant supprimable.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		removed: {
			control: {
				type: 'boolean',
			},
			description: 'Masque le composant. Passe à `true` au clic sur le bouton de fermeture. Two-way.',
			table: { category: 'models', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
		},
		removedChange: {
			description: 'Événement déclenché lorsque `removed` change.',
			action: 'removedChange',
			control: false,
			table: { category: 'outputs', type: { summary: 'boolean' } },
		},
		intl: intlArgType(LuPlgPushTranslations, 'LuPlgPushLabel'),
	},
} as Meta;

export const Template: StoryObj<PLGPushComponent> = {
	args: {
		heading: ``,
		removable: false,
		removed: false,
	},
};
