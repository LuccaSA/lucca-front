# filterbar — Code & Implementation

**Sommaire**

- Angular
  - Filter pills optionnelles
  - luFilterPillAddonBefore et luFilterPillAddonAfter
  - Traductions
  - Bar segmented control tabs
  - Bar
- HTML/CSS
  - Bar segmented control tabs
  - Bar

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-filterspills-filterbar-angular-segmented-control-tabs--docs)

## Angular

Component selector : `lu-filter-bar`

### Filter pills optionnelles

`optional` permet de conditionner l'affichage d'une filter pill. Elle sera masquée par défaut et accessible depuis le bouton filtre.

Une filter pill optionnelle doit obligatoirement contenir un attribut `name` (dont la valeur est libre) afin de pouvoir être affichée.

### luFilterPillAddonBefore et luFilterPillAddonAfter

Deux directives structurelles permettent de projeter du contenu aux extrémités de la FilterBar.

| **`*`**`luFilterPillAddonBefore` | Placé **avant** les pills, dans la zone scrollable, avec un séparateur vertical automatique. Exemple : un SegmentedControl ou un sélecteur de vues. |
| --- | --- |
| **`*`**`luFilterPillAddonAfter` | Placé **après** les pills, aligné à droite. Exemple : un bouton d'export. |

### Traductions

`lu-filter-bar`et `lu-filter-view-selector` exposent leur propre input `intl()`, qui donne accès à un ensemble de clés de traduction utilisables directement dans vos templates.

| Clé | Traduction FR |
| --- | --- |
| `FilterViewSelectorComponent.intl().renameView` | Modifier le nom |
| `FilterViewSelectorComponent.intl().deleteView` | Supprimer |
| `FilterBarComponent.intl().saveView` | Enregistrer la vue |
| `FilterBarComponent.intl().saveModification` | Enregistrer les modifications |
| `FilterBarComponent.intl().saveNewView` | Enregistrer en tant que nouvelle vue |

### Bar segmented control tabs

```js
import { FilterBarComponent } from '@lucca-front/ng/filter-pills';
```

```html
<lu-filter-bar [segmentedControlTabs]="tabs">
	<lu-filter-pill label="Établissement" name="establishment">
		<lu-simple-select [ngModel]="null" apiV4="/organization/structure/api/establishments" />
	</lu-filter-pill>
	<lu-filter-pill label="Départements" name="departments">
		<lu-multi-select [ngModel]="[]" departments [filterPillLabelPluralFn]="departmentsPluralFn" />
	</lu-filter-pill>
	<lu-form-field label="Rechercher" hiddenLabel>
		<lu-text-input [ngModel]="null" [ngModelOptions]="{ standalone: true }" hasSearchIcon hasClearer />
	</lu-form-field>
</lu-filter-bar>
<lu-segmented-control-tabs #tabs ariaLabel="Affichage">
	<lu-segmented-control-tabs-panel label="Liste" icon="list" hiddenLabel value="list">
		Liste des collaborateurs
	</lu-segmented-control-tabs-panel>
	<lu-segmented-control-tabs-panel label="Grille" icon="tiles" hiddenLabel value="grid">
		Grille des collaborateurs
	</lu-segmented-control-tabs-panel>
</lu-segmented-control-tabs>
```

### Bar

```js
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { DividerComponent } from '@lucca-front/ng/divider';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent, FilterViewSelectorComponent, luFilterPillsTranslations } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent } from '@lucca-front/ng/segmented-control-tabs';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { IconComponent } from '@lucca/prisme/icon';
```

```html
<lu-filter-bar [resultsCount]="resultsCount">
	<lu-filter-pill label="Inclure les collaborateurs partis" name="includeFormerEmployees">
		<lu-checkbox-input [ngModel]="false" />
	</lu-filter-pill>
	<lu-filter-pill label="Établissement" name="establishment">
		<lu-simple-select [ngModel]="null" apiV4="/organization/structure/api/establishments" />
	</lu-filter-pill>
	<lu-filter-pill label="Départements" name="departments">
		<lu-multi-select [ngModel]="[]" departments [filterPillLabelPluralFn]="departmentsPluralFn" />
	</lu-filter-pill>
	<lu-filter-pill label="Date de début" name="startingDate">
		<lu-date-input [(ngModel)]="example1" />
	</lu-filter-pill>

	<lu-form-field label="Test" hiddenLabel>
		<lu-text-input [ngModel]="example2" [ngModelOptions]="{ standalone: true }" hasSearchIcon hasClearer />
	</lu-form-field>
</lu-filter-bar>
```

## HTML/CSS

### Bar segmented control tabs

```css
@forward '@lucca-front/scss/src/components/filterBar';
@forward '@lucca-front/scss/src/components/clear';
@forward '@lucca-front/scss/src/components/divider';
@forward '@lucca-front/scss/src/components/filterPill';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/segmentedControl';
@forward '@lucca-front/scss/src/components/textField';
```

```html
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
		<div class="divider filterBar-scrollBox-divider"></div>
	</lu-scroll-box>
</div>
<div
	class="segmentedControl_panel is-active"
	role="tabpanel"
	tabindex="0"
	id="filterBarPanel1"
	aria-labelledby="filterBarTab1"
>
	Liste des collaborateurs
</div>
<div class="segmentedControl_panel" role="tabpanel" tabindex="0" id="filterBarPanel2" aria-labelledby="filterBarTab2">
	Grille des collaborateurs
</div>
```

### Bar

```css
@forward '@lucca-front/scss/src/components/filterBar';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/clear';
@forward '@lucca-front/scss/src/components/divider';
@forward '@lucca-front/scss/src/components/filterPill';
@forward '@lucca-front/scss/src/components/numericBadge';
@forward '@lucca-front/scss/src/components/segmentedControl';
```

```html
<form>
	<div class="filterBar">
		<span class="pr-u-mask" role="status">24 résultats</span>
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

				<div class="divider filterBar-divider"></div>

				<button type="button" class="filterPill mod-checkbox" #button>
					<span class="filterPill-checkbox">
						<span class="filterPill-checkbox-input"></span>
						<span class="filterPill-checkbox-icon" aria-hidden="true">
							<span class="filterPill-checkbox-icon-check"></span>
						</span>
					</span>
					<span
						class="filterPill-label"
						luTooltip="Inclure les collaborateurs partis"
						luTooltipWhenEllipsis
						[luTooltipTriggerAnchor]="button"
					>
						Inclure les collaborateurs partis
						<span
							class="filterPill-label-placeholder"
							aria-hidden="true"
							data-content-before="Inclure les collaborateurs partis"
						></span>
					</span>
				</button>

				<div class="filterPillWrapper">
					<button type="button" class="filterPill" aria-expanded="false" aria-controls="panel">
						<span class="filterPill-label">Département</span>
						<span class="filterPill-value"></span>
						<span class="filterPill-toggle">
							<span class="lucca-icon icon-arrowChevronBottom mod-S"></span>
						</span>
					</button>
					<button type="button" class="filterPill_clear clear"><span class="pr-u-mask">Vider ce champ</span></button>
				</div>

				<button type="submit" class="button mod-ghost mod-S palette-product">Appliquer les filtres</button>

				<span class="filterBar-scrollBox-group-results" aria-hidden="true">24 résultats</span>
			</div>
			<div class="filterBar-scrollBox-export">
				<button type="submit" class="button mod-S mod-outlined">Exporter</button>
			</div>
		</lu-scroll-box>
	</div>
</form>
```
