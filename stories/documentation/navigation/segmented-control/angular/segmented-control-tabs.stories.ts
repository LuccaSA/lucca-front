import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent } from '@lucca-front/ng/segmented-control-tabs';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface segmentedControlBasicStory {
	small: boolean;
	withNumericBadge: boolean;
	vertical: boolean;
	ariaLabel: string;
	active: string;
}

export default {
	decorators: [
		moduleMetadata({
			imports: [NumericBadgeComponent, SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent],
		}),
	],
	argTypes: {
		small: {
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		withNumericBadge: {
			description: 'Présente un exemple avec un Numeric Badge.',
			table: { category: 'story' },
		},
		vertical: {
			description: 'Affiche le composant en vue verticale.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		ariaLabel: {
			description: "Nom accessible du groupe d'onglets, restitué aux technologies d'assistance.",
			table: { category: 'inputs', defaultValue: { summary: 'null' } },
		},
		active: {
			options: ['0', '1', '2', '3'],
			control: { type: 'select' },
			description: 'Valeur de l’onglet actif. Two-way. Le premier onglet est activé si aucune valeur n’est fournie.',
			table: { category: 'models', type: { summary: 'T | null' }, defaultValue: { summary: 'null' } },
		},
		label: {
			control: false,
			description: 'Libellé de l’onglet.',
			table: { category: 'inputs (segmented-control-tabs-panel)', type: { summary: 'PortalContent' } },
		},
		value: {
			control: false,
			description: 'Valeur de l’onglet (obligatoire).',
			table: { category: 'inputs (segmented-control-tabs-panel)', type: { summary: 'T' } },
		},
	},
	title: 'Documentation/Navigation/segmentedControl/Angular/Tabs',
} as Meta;

function getTemplate(args: segmentedControlBasicStory): string {
	const size = args.small ? ` small` : ``;
	const vertical = args.vertical ? ` vertical` : ``;
	const ariaLabel = args.ariaLabel ? ` [ariaLabel]="ariaLabel"` : ``;
	const numericBadgeComponent = args.withNumericBadge ? ` <lu-numeric-badge value="8" />` : ``;
	return `<ng-template #label>
	Lorem${numericBadgeComponent}
</ng-template>
<lu-segmented-control-tabs${size}${vertical}${ariaLabel} [(active)]="active">
	<lu-segmented-control-tabs-panel [label]="label" value="0">
		<div class="demo">Content Lorem</div>
	</lu-segmented-control-tabs-panel>
	<lu-segmented-control-tabs-panel label="Ipsum" value="1">
		<div class="demo">Content Ipsum</div>
	</lu-segmented-control-tabs-panel>
	<lu-segmented-control-tabs-panel label="Dolor sit amet" value="2">
		<div class="demo">Content Dolor sit amet</div>
	</lu-segmented-control-tabs-panel>
	<lu-segmented-control-tabs-panel label="Consectetur adipisicing elit" value="3">
		<div class="demo">Content Consectetur adipisicing elit</div>
	</lu-segmented-control-tabs-panel>
</lu-segmented-control-tabs>
`;
}

const Template = (args: segmentedControlBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`.demo { margin-block-start: 1rem }`],
});

export const Basic: StoryObj<segmentedControlBasicStory> = {
	args: {
		small: false,
		withNumericBadge: false,
		vertical: false,
		ariaLabel: 'Lorem ipsum',
		active: '0',
	},
	render: Template,
};
