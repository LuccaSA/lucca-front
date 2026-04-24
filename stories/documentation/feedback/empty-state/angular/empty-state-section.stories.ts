import { HttpClientModule } from '@angular/common/http';
import { BUBBLE_ILLUSTRATION } from '@lucca-front/ng/bubble-illustration';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EMPTY_STATE_HX, EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { setStoryOptions } from 'stories/helpers/stories';
import { PaletteArgType } from '../../../../helpers/common-arg-types';

export default {
	title: 'Documentation/Feedback/Empty State/Angular/Section',
	component: EmptyStateSectionComponent,
	decorators: [
		moduleMetadata({
			imports: [EmptyStateSectionComponent, ButtonComponent, HttpClientModule],
		}),
	],
	render: (args) => {
		const { heading, description, center, palette, hx, illustration, action } = args;
		const paletteArg = palette !== 'none' ? ` palette="${palette}"` : ``;
		const actionArg = action ? ` action` : ``;
		return {
			template: `<lu-empty-state-section illustration="${illustration}" hx="${hx}" heading="${heading}" description="${description}"${actionArg}${paletteArg}${center ? ' center' : ''}>
	<button luButton type="button" palette="product">Button</button>
	<button luButton="outlined" type="button">Button</button>
</lu-empty-state-section>`,
		};
	},
	argTypes: {
		palette: { ...PaletteArgType, description: 'Applique une palette de couleurs au composant.' },
		center: {
			description: 'Centre le contenu horizontalement.',
		},
		action: {
			description: 'Ajoute une icône (+) à l’illustration.',
		},
		illustration: {
			options: setStoryOptions(BUBBLE_ILLUSTRATION),
			control: {
				type: 'select',
			},
			description: 'Modifie l’illustration.',
		},
		hx: {
			control: {
				type: 'number',
				min: EMPTY_STATE_HX.at(0),
				max: EMPTY_STATE_HX.at(EMPTY_STATE_HX.length - 1),
			},
			description: 'Définit le niveau sémantique du titre.',
		},
		heading: {
			description: 'Titre de l’empty state.',
		},
		description: {
			description: 'Description de l’empty state.',
		},
	},
} as Meta;

export const Section: StoryObj<EmptyStateSectionComponent> = {
	args: {
		illustration: 'rocket',
		action: false,
		heading: 'Empty state section',
		description: 'Description can be a string or a ng-template',
		center: false,
		palette: 'none',
		hx: 3,
	},
};
