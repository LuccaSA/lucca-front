import { Meta, StoryObj } from '@storybook/angular-vite';
import meta from '@/stories/forms/filter-pills/html&css/filter-bar.stories';

export default {
	...meta,
	title: 'Documentation/Forms/FiltersPills/FilterBar/HTML&CSS/Segmented Control Tabs',
} as Meta;

export const SegmentedControlTabs: StoryObj<{ actionButton: boolean }> = {
	args: {
		actionButton: false,
	},
	argTypes: {
		actionButton: {
			description: 'Affiche un bouton d’action après les onglets, séparé par le divider (masqué en CSS quand il est le dernier élément).',
			control: { type: 'boolean' },
		},
	},
	render: (args) => ({
		template: `
	<div class="filterBar">
		<lu-scroll-box class="filterBar-scrollBox">
			<div class="filterBar-scrollBox-group">
				<div class="filterPillWrapper">
					<button type="button" class="filterPill" aria-expanded="false">
						<span class="filterPill-label">Établissement</span>
						<span class="filterPill-value"></span>
						<span class="filterPill-toggle">
							<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom mod-S"></span>
						</span>
					</button>
					<button type="button" class="filterPill_clear clear"><span class="pr-u-mask">Vider ce champ</span></button>
				</div>
				<div class="filterPillWrapper">
					<button type="button" class="filterPill" aria-expanded="false">
						<span class="filterPill-label">Départements</span>
						<span class="filterPill-value"></span>
						<span class="filterPill-toggle">
							<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom mod-S"></span>
						</span>
					</button>
					<button type="button" class="filterPill_clear clear"><span class="pr-u-mask">Vider ce champ</span></button>
				</div>
				<div class="form-field">
					<label class="formLabel pr-u-mask" for="filterBarSearch">Rechercher</label>
					<div class="textField">
						<div class="textField-input">
							<input class="textField-input-value" type="text" id="filterBarSearch" />
							<div class="textField-input-affix">
								<span aria-hidden="true" class="lucca-icon icon-searchMagnifyingGlass textField-input-affix-icon"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="filterBar-scrollBox-tabs">
				<ul class="segmentedControl" role="tablist" aria-label="Affichage">
					<li class="segmentedControl-item" role="presentation">
						<button
							class="segmentedControl-item-action"
							type="button"
							role="tab"
							id="filterBarTab1"
							aria-controls="filterBarPanel1"
							luTooltip="Liste"
							luTooltipOnlyForDisplay
							aria-selected="true"
						>
							<span aria-hidden="true" class="lucca-icon icon-list"></span>
							<span class="pr-u-mask">Liste</span>
						</button>
					</li>
					<li class="segmentedControl-item" role="presentation">
						<button
							class="segmentedControl-item-action"
							type="button"
							role="tab"
							id="filterBarTab2"
							aria-controls="filterBarPanel2"
							luTooltip="Grille"
							luTooltipOnlyForDisplay
							aria-selected="false"
							tabindex="-1"
						>
							<span aria-hidden="true" class="lucca-icon icon-tiles"></span>
							<span class="pr-u-mask">Grille</span>
						</button>
					</li>
				</ul>
			</div>
			<div class="divider filterBar-scrollBox-divider"></div>${
				args.actionButton
					? `
			<div class="filterBar-scrollBox-export">
				<button type="submit" class="button mod-S mod-outlined">Exporter</button>
			</div>`
					: ''
			}
		</lu-scroll-box>
	</div>
	<div class="segmentedControl_panel is-active" role="tabpanel" tabindex="0" id="filterBarPanel1" aria-labelledby="filterBarTab1">Liste des collaborateurs</div>
	<div class="segmentedControl_panel" role="tabpanel" tabindex="0" id="filterBarPanel2" aria-labelledby="filterBarTab2">Grille des collaborateurs</div>
`,
	}),
};
