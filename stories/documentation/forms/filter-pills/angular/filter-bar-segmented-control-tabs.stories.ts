import { FilterBarComponent } from '@lucca-front/ng/filter-pills';
import { Meta, StoryObj } from '@storybook/angular-vite';
import meta from '@/stories/forms/filter-pills/angular/filter-bar.stories';

export default {
	...meta,
	title: 'Documentation/Forms/FiltersPills/FilterBar/Angular/Segmented Control Tabs',
} as Meta;

/**
 * Les onglets d’un `lu-segmented-control-tabs` passé à l’input `segmentedControlTabs` s’affichent à la fin de la FilterBar,
 * à droite (ils défilent avec les filtres sur écran tactile). Ses panels restent là où il est déclaré, sous la FilterBar.
 *
 * Les actions du slot `luFilterPillAddonAfter` s’affichent après les onglets, séparées par un divider vertical.
 */
export const SegmentedControlTabs: StoryObj<FilterBarComponent & { actionButton: boolean }> = {
	args: {
		actionButton: false,
		manualApply: false,
	},
	parameters: {
		controls: { include: ['actionButton', 'manualApply', 'intl'] },
	},
	render: (args) => {
		const applyButton = args['manualApply']
			? `
	<button type="submit" size="S" luButton="ghost" palette="product">Appliquer les filtres</button>`
			: '';
		const actionButton = args['actionButton']
			? `
	<button *luFilterPillAddonAfter type="submit" size="S" luButton="outlined">Exporter</button>`
			: '';
		return {
			props: {
				departmentsPluralFn: (count: number) => `${count} départements`,
			},
			template: `<lu-filter-bar [segmentedControlTabs]="tabs"${args['manualApply'] ? ' manualApply' : ''}>
	<lu-filter-pill label="Établissement" name="establishment">
		<lu-simple-select [ngModel]="null" apiV4="/organization/structure/api/establishments" />
	</lu-filter-pill>
	<lu-filter-pill label="Départements" name="departments">
		<lu-multi-select [ngModel]="[]" departments [filterPillLabelPluralFn]="departmentsPluralFn" />
	</lu-filter-pill>
	<lu-form-field label="Rechercher" hiddenLabel>
		<lu-text-input [ngModel]="null" [ngModelOptions]="{ standalone: true }" hasSearchIcon hasClearer />
	</lu-form-field>${applyButton}${actionButton}
</lu-filter-bar>
<lu-segmented-control-tabs #tabs ariaLabel="Affichage">
	<lu-segmented-control-tabs-panel label="Liste" icon="list" hiddenLabel value="list">Liste des collaborateurs</lu-segmented-control-tabs-panel>
	<lu-segmented-control-tabs-panel label="Grille" icon="tiles" hiddenLabel value="grid">Grille des collaborateurs</lu-segmented-control-tabs-panel>
</lu-segmented-control-tabs>`,
		};
	},
};
