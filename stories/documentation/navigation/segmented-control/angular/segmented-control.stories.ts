import { FormsModule } from '@angular/forms';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

interface segmentedControlBasicStory {
	small: boolean;
	withNumericBadge: boolean;
	vertical: boolean;
	ariaLabel: string;
}

export default {
	decorators: [
		moduleMetadata({
			imports: [NumericBadgeComponent, SegmentedControlComponent, SegmentedControlFilterComponent, FormsModule, StoryModelDisplayComponent],
		}),
	],
	argTypes: {
		small: {
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs' },
		},
		withNumericBadge: {
			description: 'Présente un exemple avec un Numeric Badge.',
			table: { category: 'inputs' },
		},
		vertical: {
			description: 'Affiche le composant en vue verticale.',
			table: { category: 'inputs' },
		},
		ariaLabel: {
			description: "Nom accessible du groupe d'options, restitué aux technologies d'assistance.",
			table: { category: 'inputs' },
		},
	},
	title: 'Documentation/Navigation/segmentedControl/Angular/Basic',
} as Meta;

function getTemplate(args: segmentedControlBasicStory): string {
	const size = args.small ? ` small` : ``;
	const vertical = args.vertical ? ` vertical` : ``;
	const ariaLabel = args.ariaLabel ? ` [ariaLabel]="ariaLabel"` : ``;
	const numericBadgeComponent = args.withNumericBadge ? ` <lu-numeric-badge value="8" />` : ``;

	return `<ng-template #label>
	Lorem${numericBadgeComponent}
</ng-template>
<lu-segmented-control${size}${vertical}${ariaLabel} [(ngModel)]="sample">
	<lu-segmented-control-filter [label]="label" value="0" />
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
		withNumericBadge: false,
		vertical: false,
		ariaLabel: 'Lorem ipsum',
	},
	render: Template,
};
