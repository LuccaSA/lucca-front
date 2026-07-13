# filterbar — Bar _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/filter-pills';
@forward '@lucca-front/scss/src/components/clear';
@forward '@lucca-front/scss/src/components/filterBar';
@forward '@lucca-front/scss/src/components/filterPill';
@forward '@lucca-front/scss/src/components/numericBadge';
@forward '@lucca-front/scss/src/components/segmentedControl';
```

```html
<form>
	<div class="filterBar" [ngModel]="group" [ngModelOptions]="{ standalone: true }">
		<lu-scroll-box class="filterBar-scrollBox">
			<div class="filterBar-scrollBox-group">
				<ul class="segmentedControl filterBar-segmentedControl" role="presentation">
					<li class="segmentedControl-item">
						<input type="radio" class="segmentedControl-item-input" name="tab" id="tab1" checked="checked" />
						<label for="tab1" class="segmentedControl-item-action">Tous</label>
					</li>
					<li class="segmentedControl-item">
						<input type="radio" class="segmentedControl-item-input" name="tab" id="tab2" />
						<label for="tab2" class="segmentedControl-item-action">
							En cours d’approbation @if (withNumericBadge) {
							<span class="numericBadge">8</span>
							}
						</label>
					</li>
					<li class="segmentedControl-item">
						<input type="radio" class="segmentedControl-item-input" name="tab" id="tab3" />
						<label for="tab3" class="segmentedControl-item-action">
							Approuvés @if (withNumericBadge) {
							<span class="numericBadge">88</span>
							}
						</label>
					</li>
					<li class="segmentedControl-item">
						<input type="radio" class="segmentedControl-item-input" name="tab" id="tab4" />
						<label for="tab4" class="segmentedControl-item-action">Clos</label>
					</li>
				</ul>

				<lu-divider class="filterBar-divider" />

				<button
					class="filterPill mod-button"
					type="button"
					luTooltip="Filtres supplémentaires"
					luTooltipOnlyForDisplay
					[luPopover2]="contentOptions"
				>
					<lu-icon class="filterPill-icon" icon="filtersDescending" alt="Filtres supplémentaires" />
				</button>

				<div class="filterPill">
					<label
						for="input1"
						class="filterPill-label"
						luTooltip="Inclure les collaborateurs partis"
						luTooltipWhenEllipsis="true"
					>
						Inclure les collaborateurs partis
						<span
							class="filterPill-label-placeholder"
							aria-hidden="true"
							data-content-before="Inclure les collaborateurs partis"
						></span>
					</label>
					<span class="filterPill-checkbox">
						<input type="checkbox" id="input1" class="filterPill-checkbox-input" />
						<span class="filterPill-checkbox-icon" aria-hidden="true">
							<span class="filterPill-checkbox-icon-check"></span>
						</span>
					</span>
				</div>

				<div class="filterPill is-filled">
					<label for="input1" class="filterPill-label" luTooltip="Département" luTooltipWhenEllipsis="true">
						Équipe :
					</label>
					<button
						class="filterPill-combobox"
						type="button"
						id="input1"
						role="combobox"
						aria-expanded="false"
						luTooltipWhenEllipsis="true"
					>
						Finance
					</button>
					<button type="button" class="filterPill-clear clear"><span class="pr-u-mask">Vider ce champ</span></button>
					<button type="button" aria-hidden="true" tabindex="-1" class="filterPill-toggle">
						<lu-icon icon="arrowChevronBottom" size="S" />
					</button>
				</div>

				<lu-filter-pill label="Échéance">
					<lu-date-input [ngModel]="example6" [ngModelOptions]="{ standalone: true }" />
				</lu-filter-pill>

				<lu-form-field label="Test" hiddenLabel>
					<lu-text-input [ngModel]="example10" [ngModelOptions]="{ standalone: true }" hasSearchIcon hasClearer />
				</lu-form-field>

				<button type="submit" size="S" luButton="ghost" palette="product">Appliquer les filtres</button>
			</div>
			<div class="filterBar-scrollBox-export">
				<button type="submit" size="S" luButton="outlined">Exporter</button>
			</div>
		</lu-scroll-box>
	</div>
</form>

<ng-template #contentOptions>
	<form class="filterPill_popover-content popover-contentOptional">
		<lu-form-field
			label="Inclure les collaborateurs partis"
			class="filterPill_popover-content-formField mod-selectOption"
		>
			<lu-checkbox-input [ngModel]="true" [ngModelOptions]="{ standalone: true }" />
		</lu-form-field>
		<lu-form-field label="Équipe" class="filterPill_popover-content-formField mod-selectOption">
			<lu-checkbox-input [ngModel]="true" [ngModelOptions]="{ standalone: true }" />
		</lu-form-field>
		<lu-form-field label="Statut" class="filterPill_popover-content-formField mod-selectOption">
			<lu-checkbox-input [ngModel]="false" [ngModelOptions]="{ standalone: true }" />
		</lu-form-field>
		<lu-form-field label="Échéance" class="filterPill_popover-content-formField mod-selectOption">
			<lu-checkbox-input [ngModel]="true" [ngModelOptions]="{ standalone: true }" />
		</lu-form-field>
		<lu-form-field label="Fréquence de facturation" class="filterPill_popover-content-formField mod-selectOption">
			<lu-checkbox-input [ngModel]="false" [ngModelOptions]="{ standalone: true }" />
		</lu-form-field>
	</form>
</ng-template>
```
