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
		const { heading, description, center, palette, headingLevel, illustration, action } = args;
		const richContent = args['richContent'];
		const descriptionArg = richContent ? `` : ` description="${description}"`;
		const projectedDescription = richContent ? `\n\t<p luEmptyStateDescription>You have <strong>no pending request</strong> yet. New requests will appear here.</p>` : ``;
		const paletteArg = palette ? ` palette="${palette}"` : ``;
		const actionArg = action ? ` action` : ``;
		return {
			template: `<lu-empty-state-section illustration="${illustration}" headingLevel="${headingLevel}" heading="${heading}"${descriptionArg}${actionArg}${paletteArg}${center ? ' center' : ''}>${projectedDescription}
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
			if: { arg: 'richContent', truthy: false },
			description: 'Texte affiché sous le titre. Contenu riche : directive <code>luEmptyStateDescription</code> (l’input prévaut).',
			table: { category: 'inputs' },
		},
		richContent: {
			description: 'Remplace l’input <code>description</code> par un contenu riche projeté avec la directive <code>luEmptyStateDescription</code>.',
			table: { category: 'story' },
		},
	},
} as Meta;

export const Section: StoryObj<EmptyStateSectionComponent & { richContent: boolean }> = {
	args: {
		illustration: 'rocket',
		action: false,
		heading: 'Empty state section',
		description: 'You have no pending request yet. New requests will appear here.',
		center: false,
		headingLevel: 3,
		richContent: false,
	},
};
