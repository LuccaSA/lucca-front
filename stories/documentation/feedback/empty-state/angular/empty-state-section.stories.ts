import { HttpClientModule } from '@angular/common/http';
import { BUBBLE_ILLUSTRATION } from '@lucca-front/ng/bubble-illustration';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EMPTY_STATE_HEADING_LEVEL, EmptyStateDescriptionDirective, EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { setStoryOptions } from '@/helpers/stories';
import { PaletteArgType } from '../../../../helpers/common-arg-types';

export default {
	title: 'Documentation/Feedback/Empty State/Angular/Section',
	component: EmptyStateSectionComponent,
	decorators: [
		moduleMetadata({
			imports: [EmptyStateSectionComponent, EmptyStateDescriptionDirective, ButtonComponent, HttpClientModule],
		}),
	],
	render: (args) => {
		const { heading, center, palette, headingLevel, illustration, action } = args;
		const paletteArg = palette ? ` palette="${palette}"` : ``;
		const actionArg = action ? ` action` : ``;
		return {
			template: `<lu-empty-state-section illustration="${illustration}" headingLevel="${headingLevel}" heading="${heading}"${actionArg}${paletteArg}${center ? ' center' : ''}>
	<p luEmptyStateDescription>You have <strong>no pending request</strong> yet. New requests will appear here.</p>
	<button luButton type="button" palette="product">Button</button>
	<button luButton="outlined" type="button">Button</button>
</lu-empty-state-section>`,
		};
	},
	argTypes: {
		palette: { ...PaletteArgType, description: 'Applique une palette de couleurs au composant.', table: { category: 'inputs' } },
		center: {
			description: 'Centre le contenu horizontalement.',
			table: { category: 'inputs' },
		},
		action: {
			description: 'Ajoute une icône (+) à l’illustration.',
			table: { category: 'inputs' },
		},
		illustration: {
			options: setStoryOptions(BUBBLE_ILLUSTRATION),
			control: {
				type: 'select',
			},
			description: 'Modifie l’illustration.',
			table: { category: 'inputs' },
		},
		headingLevel: {
			control: {
				type: 'number',
				min: EMPTY_STATE_HEADING_LEVEL.at(0),
				max: EMPTY_STATE_HEADING_LEVEL.at(EMPTY_STATE_HEADING_LEVEL.length - 1),
			},
			description: 'Définit le niveau sémantique du titre.',
			table: { category: 'inputs', defaultValue: { summary: '3' } },
		},
		hx: {
			control: false,
			description: '[Déprécié] Utiliser <code>headingLevel</code>.',
			table: { category: 'inputs (deprecated)' },
		},
		heading: {
			description: 'Titre de l’empty state.',
			table: { category: 'inputs' },
		},
		description: {
			control: false,
			description:
				'Texte affiché sous le titre. Pour un texte simple, renseigner l’input <code>description</code> sur <code>lu-empty-state-section</code> [PortalContent]. Pour un contenu riche (mise en forme, lien…), projeter dans le composant un élément portant la directive <code>luEmptyStateDescription</code>, comme dans cet exemple. L’input prévaut si les deux sont fournis.',
			table: { category: 'inputs' },
		},
	},
} as Meta;

export const Section: StoryObj<EmptyStateSectionComponent> = {
	args: {
		illustration: 'rocket',
		action: false,
		heading: 'Empty state section',
		center: false,
		headingLevel: 3,
	},
};
