import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent } from '@lucca-front/ng/segmented-control-tabs';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface segmentedControlBasicStory {
	small: boolean;
	withNumericBadge: boolean;
	vertical: boolean;
	ariaLabel: string;
	withIcon: boolean;
	hiddenLabel: boolean;
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
			if: { arg: 'hiddenLabel', truthy: false },
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
		withIcon: {
			description: 'Affiche une icône avant le libellé de chaque onglet, via l’input `icon` de `lu-segmented-control-tabs-panel`.',
			table: { category: 'story' },
		},
		hiddenLabel: {
			name: '↳ hiddenLabel',
			description:
				'Masque le libellé de l’onglet, conservé pour les technologies d’assistance et affiché en infobulle au survol et au focus. Nécessite un libellé texte (ignoré pour un libellé template).',
			if: { arg: 'withIcon', truthy: true },
			table: { category: 'inputs (segmented-control-tabs-panel)' },
		},
	},
	title: 'Documentation/Navigation/segmentedControl/Angular/Tabs',
} as Meta;

function getTemplate(args: segmentedControlBasicStory): string {
	const size = args.small ? ` small` : ``;
	const vertical = args.vertical ? ` vertical` : ``;
	const ariaLabel = args.ariaLabel ? ` [ariaLabel]="ariaLabel"` : ``;
	const numericBadgeComponent = args.withNumericBadge ? ` <lu-numeric-badge value="8" />` : ``;
	// A hidden label requires a text label: the template label (with its numeric badge) is only used when the label is displayed
	const hiddenLabel = args.withIcon && args.hiddenLabel;
	const firstLabel = hiddenLabel ? `label="Lorem"` : `[label]="label"`;
	const labelTemplate = hiddenLabel
		? ``
		: `<ng-template #label>
	Lorem${numericBadgeComponent}
</ng-template>
`;
	const icons = ['list', 'tiles', 'mapPlan', 'calendar'].map((icon) => (args.withIcon ? ` icon="${icon}"${args.hiddenLabel ? ' hiddenLabel' : ''}` : ``));
	return `${labelTemplate}<lu-segmented-control-tabs${size}${vertical}${ariaLabel} [(active)]="active">
	<lu-segmented-control-tabs-panel ${firstLabel}${icons[0]} value="0">
		<div class="demo">Content Lorem</div>
	</lu-segmented-control-tabs-panel>
	<lu-segmented-control-tabs-panel label="Ipsum"${icons[1]} value="1">
		<div class="demo">Content Ipsum</div>
	</lu-segmented-control-tabs-panel>
	<lu-segmented-control-tabs-panel label="Dolor sit amet"${icons[2]} value="2">
		<div class="demo">Content Dolor sit amet</div>
	</lu-segmented-control-tabs-panel>
	<lu-segmented-control-tabs-panel label="Consectetur adipisicing elit"${icons[3]} value="3">
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
		withIcon: false,
		hiddenLabel: false,
		active: '0',
	},
	render: Template,
};
