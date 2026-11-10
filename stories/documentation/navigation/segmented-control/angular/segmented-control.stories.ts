import { FormsModule } from '@angular/forms';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent, SegmentedControlFilterLabelDirective } from '@lucca-front/ng/segmented-control';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

interface segmentedControlBasicStory {
	small: boolean;
	richContent: boolean;
	vertical: boolean;
	ariaLabel: string;
}

export default {
	decorators: [
		moduleMetadata({
			imports: [NumericBadgeComponent, SegmentedControlComponent, SegmentedControlFilterComponent, SegmentedControlFilterLabelDirective, FormsModule, StoryModelDisplayComponent],
		}),
	],
	argTypes: {
		small: {
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs' },
		},
		richContent: {
			description: 'Remplace l’input <code>label</code> de la première option par un contenu riche, ici avec un Numeric Badge, projeté avec la directive <code>luSegmentedControlFilterLabel</code>.',
			table: { category: 'story' },
		},
		vertical: {
			description: 'Affiche le composant en vue verticale.',
			table: { category: 'inputs' },
		},
		ariaLabel: {
			description: "Nom accessible du groupe d'options, restitué aux technologies d'assistance.",
			table: { category: 'inputs' },
		},
		label: {
			control: false,
			description:
				'Libellé du filtre. Pour un texte simple, renseigner l’input <code>label</code> sur <code>lu-segmented-control-filter</code> [PortalContent], comme dans cet exemple. Pour un contenu riche (mise en forme, badge…), projeter dans le composant un élément portant la directive <code>luSegmentedControlFilterLabel</code> (voir l’option <code>richContent</code>). L’input prévaut si les deux sont fournis.',
			table: { category: 'inputs (segmented-control-filter)', type: { summary: 'PortalContent' } },
		},
		value: {
			control: false,
			description: 'Valeur du filtre (obligatoire).',
			table: { category: 'inputs (segmented-control-filter)', type: { summary: 'T' } },
		},
		disabled: {
			control: false,
			description: 'Désactive le filtre.',
			table: { category: 'inputs (segmented-control-filter)', defaultValue: { summary: 'false' } },
		},
	},
	title: 'Documentation/Navigation/segmentedControl/Angular/Basic',
} as Meta;

function getTemplate(args: segmentedControlBasicStory): string {
	const size = args.small ? ` small` : ``;
	const vertical = args.vertical ? ` vertical` : ``;
	const ariaLabel = args.ariaLabel ? ` [ariaLabel]="ariaLabel"` : ``;
	const firstFilter = args.richContent
		? `<lu-segmented-control-filter value="0">
		<ng-container luSegmentedControlFilterLabel>Lorem <lu-numeric-badge value="8" /></ng-container>
	</lu-segmented-control-filter>`
		: `<lu-segmented-control-filter label="Lorem" value="0" />`;

	return `<lu-segmented-control${size}${vertical}${ariaLabel} [(ngModel)]="sample">
	${firstFilter}
	<lu-segmented-control-filter label="Ipsum" value="1" />
	<lu-segmented-control-filter label="Dolor sit amet" value="2" />
	<lu-segmented-control-filter label="Consectetur adipisicing elit" value="3" />
</lu-segmented-control>
<pr-story-model-display>{{sample}}</pr-story-model-display>
`;
}

const Template = (args: segmentedControlBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<segmentedControlBasicStory> = {
	args: {
		small: false,
		vertical: false,
		ariaLabel: 'Lorem ipsum',
		richContent: false,
	},
	render: Template,
};
