import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent, SegmentedControlTabsPanelLabelDirective } from '@lucca-front/ng/segmented-control-tabs';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface segmentedControlBasicStory {
	small: boolean;
	richContent: boolean;
	vertical: boolean;
	ariaLabel: string;
	withIcon: boolean;
	hiddenLabel: boolean;
	active: string;
}

export default {
	decorators: [
		moduleMetadata({
			imports: [NumericBadgeComponent, SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent, SegmentedControlTabsPanelLabelDirective],
		}),
	],
	argTypes: {
		small: {
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		richContent: {
			description: 'Remplace l’input <code>label</code> du premier onglet par un contenu riche (avec un Numeric Badge).',
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
			description: 'Libellé de l’onglet. Contenu riche : directive <code>luSegmentedControlTabsPanelLabel</code> (l’input prévaut).',
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
			description: 'Masque le libellé, affiché en infobulle et conservé pour les lecteurs d’écran. Nécessite un <code>label</code> texte.',
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
	// A hidden label requires a text label: the projected label (with its numeric badge) is only used when the label is displayed
	const richContent = args.richContent && !(args.withIcon && args.hiddenLabel);
	const firstLabel = richContent ? `` : ` label="Lorem"`;
	const projectedLabel = richContent
		? `
		<ng-container luSegmentedControlTabsPanelLabel>Lorem <lu-numeric-badge value="8" /></ng-container>`
		: ``;
	const icons = ['list', 'tiles', 'mapPlan', 'calendar'].map((icon) => (args.withIcon ? ` icon="${icon}"${args.hiddenLabel ? ' hiddenLabel' : ''}` : ``));
	return `<lu-segmented-control-tabs${size}${vertical}${ariaLabel} [(active)]="active">
	<lu-segmented-control-tabs-panel${firstLabel}${icons[0]} value="0">${projectedLabel}
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
		vertical: false,
		ariaLabel: 'Lorem ipsum',
		withIcon: false,
		hiddenLabel: false,
		active: '0',
		richContent: false,
	},
	render: Template,
};
