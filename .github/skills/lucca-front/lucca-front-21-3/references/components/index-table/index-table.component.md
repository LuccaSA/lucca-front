# index-table — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-listings-index-table-angular-actions--docs)

## Angular

Component selector : `lu-index-table`

Le comportement *responsive* du composant n’est pas encore pris en charge dans sa version Angular.

### Lien vers un nouvelle page

Dans un tableau, privilégiez l'attribut `external` sur vos liens. L'icône associée n'est alors visible qu'au survol : le tableau la masque automatiquement pour ne pas surcharger des cellules souvent denses.

### Actions

```js
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DropdownActionComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import {
import { PaginationComponent } from '@lucca-front/ng/pagination';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuUserDisplayModule } from '@lucca-front/ng/user';
import { LuUserPopoverComponent, LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

```html
<lu-index-table>
	<thead luIndexTableHead>
		<tr luIndexTableRow>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell actions>Label</th>
		</tr>
	</thead>
	<tbody luIndexTableBody>
		<tr luIndexTableRow>
			<th luIndexTableCell><a href="#" luIndexTableAction>Content</a></th>
			<td luIndexTableCell>Content Content Content</td>
			<td luIndexTableCell align="end">
				<button type="button" luButton luTooltip="Supprimer" luTooltipOnlyForDisplay>
					<lu-icon icon="trash" alt="Supprimer" />
				</button>
				<button type="button" luButton luTooltip="Modifier" luTooltipOnlyForDisplay>
					<lu-icon icon="officePen" alt="Modifier" />
				</button>
			</td>
		</tr>
	</tbody>
</lu-index-table>
```

### Basic

```js
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import {
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PaginationComponent } from '@lucca-front/ng/pagination';
import { LuUserDisplayModule } from '@lucca-front/ng/user';
import { LuUserPopoverComponent, LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

```html
<lu-index-table>
	<thead luIndexTableHead>
		<tr luIndexTableRow>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell>Label</th>
			<th luIndexTableCell>Label</th>
		</tr>
	</thead>
	<tbody luIndexTableBody>
		<tr luIndexTableRow>
			<th luIndexTableCell>
				<a luIndexTableAction href="#">link</a>
			</th>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell>Content</td>
		</tr>
		<tr luIndexTableRow>
			<td luIndexTableCell colspan="3">Content</td>
		</tr>
		<tr luIndexTableRow>
			<th luIndexTableCell><a href="#" luIndexTableAction>Content</a></th>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell>Content Content Content</td>
		</tr>
	</tbody>
</lu-index-table>
```

### Tooltips

```js
import { finn } from '@/stories/users/user.mocks';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import {
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
```

```html
<lu-index-table layoutFixed>
	<thead luIndexTableHead>
		<tr luIndexTableRow>
			<th luIndexTableCell>Action</th>
			<th luIndexTableCell>Content</th>
			<th luIndexTableCell>Content</th>
			<th luIndexTableCell>Content</th>
			<th luIndexTableCell>Content</th>
			<th luIndexTableCell actions>Secondary action</th>
		</tr>
	</thead>
	<tbody luIndexTableBody>
		<tr luIndexTableRow #line1>
			<th luIndexTableCell>
				<a href="#" luIndexTableAction class="pr-u-ellipsis" luTooltip="Primary action" [luTooltipAnchor]="line1">
					Tooltip for the row
					<code class="code">a</code>
				</a>
			</th>
			<td luIndexTableCell>
				<div class="pr-u-ellipsis pr-u-focusVisible pr-u-borderRadiusSmall" luTooltip luTooltipWhenEllipsis>
					Tooltip when ellipsis
				</div>
			</td>
			<td luIndexTableCell selectable>Selectable</td>
			<td luIndexTableCell>
				<div
					class="pr-u-ellipsis pr-u-widthFitContent pr-u-focusVisible pr-u-borderRadiusM"
					luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				>
					Tooltip
				</div>
			</td>
			<td luIndexTableCell>Content</td>
			<td luIndexTableCell align="end">
				<button
					luButton
					luTooltip="Secondary action"
					luTooltipOnlyForDisplay
					type="button"
					class="indexTable-body-row-cell-subAction"
				>
					<lu-icon icon="trashDelete" alt="Supprimer" />
				</button>
			</td>
		</tr>
	</tbody>
</lu-index-table>
```

## HTML/CSS

Classe CSS : `.indexTable`

Le lien (ou bouton) redirigeant vers la version plus détaillée d'une ligne de l'indexTable doit être renseigné sur l'élément `indexTable-body-row-cell-link`. Ce lien est automatiquement étendu sur toute les cellules de la ligne pour les interactions au clic et prend le focus à la navigation clavier.

### Table actions dropdown

<callout background="1">

Le clic sur la cellule est automatiquement désactivée par le bouton d'action. Il est possible de récupérer ce clic en ajoutant `(click)="..."` sur les `td` concernés.

</callout>

### Dropdown

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/button';
```

```html
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">
				<span class="pr-u-mask">Actions</span>
			</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell mod-actions">
				<button
					type="button"
					class="button indexTable-body-row-cell-subActionDropdownTrigger mod-ghost mod-onlyIcon mod-S"
				>
					<span aria-hidden="true" class="lucca-icon icon-ellipsis"></span>
				</button>
			</td>
		</tr>
	</tbody>
</table>
```

### Table actions selectable

```css
@forward '@lucca-front/scss/src/components/index-table';
```

```html
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell mod-allowTextSelection">Content selectable</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell"><a href="#">Content actionable</a></td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>
```

### Table actions subAction

<callout background="1">

Le clic sur la cellule est automatiquement désactivée par le bouton d'action. Il est possible de récupérer ce clic en ajoutant `(click)="..."` sur les `td` concernés.

</callout>

### Dropdown

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/button';
```

```html
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">
				<span class="pr-u-mask">Actions</span>
			</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell mod-actions">
				<button type="button" class="button indexTable-body-row-cell-subAction">
					<span aria-hidden="true" class="lucca-icon icon-copy"></span>
					<span class="pr-u-mask">Copy</span>
				</button>
				<button type="button" class="button indexTable-body-row-cell-subAction">
					<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					<span class="pr-u-mask">Edit</span>
				</button>
				<button type="button" class="button mod-critical indexTable-body-row-cell-subAction">
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					<span class="pr-u-mask">Delete</span>
				</button>
			</td>
		</tr>
	</tbody>
</table>
```

### Table actions tooltipsCell

<callout background="1">

Le clic sur la cellule est automatiquement désactivée par le tooltip. Il est possible de récupérer ce clic en ajoutant `(click)="..."` sur les `td` concernés.

</callout>

### Cellule

### Ligne

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/code';
```

```html
<table class="indexTable mod-layoutFixed">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Action</th>
			<th class="indexTable-head-row-cell" scope="col">Content</th>
			<th class="indexTable-head-row-cell" scope="col">Content</th>
			<th class="indexTable-head-row-cell" scope="col">Content</th>
			<th class="indexTable-head-row-cell" scope="col" style="--components-indexTable-cell-fixed-width: 8">Content</th>
			<th
				class="indexTable-head-row-cell mod-alignRight"
				scope="col"
				style="--components-indexTable-cell-fixed-width: 3"
			>
				<span class="pr-u-mask">Secondary action</span>
			</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row pr-u-cursorPointer" (click)="message('Primary action (on row)')">
			<td class="indexTable-body-row-cell">
				<!-- preventDefault is only here for demonstration -->
				<a
					href="#"
					class="indexTable-body-row-cell-link"
					(click)="$event.preventDefault(); $event.stopPropagation(); message('Primary action (on link)')"
				>
					<span class="pr-u-mask">See details</span>
				</a>
				<div
					class="pr-u-ellipsis pr-u-widthFitContent pr-u-maxInlineSize100% pr-u-focusVisible pr-u-borderRadiusM"
					luTooltip="Primary action (you can click)"
				>
					Tooltip for the cell
					<code class="code">a</code>
				</div>
			</td>
			<td class="indexTable-body-row-cell">
				<div class="pr-u-ellipsis pr-u-focusVisible pr-u-borderRadiusSmall" luTooltip luTooltipWhenEllipsis>
					Tooltip when ellipsis
				</div>
			</td>
			<td
				class="indexTable-body-row-cell pr-u-whiteSpaceNowrap mod-allowTextSelection pr-u-cursorDefault"
				(click)="$event.stopPropagation()"
			>
				<span class="pr-u-cursorText">Selectable</span>
			</td>
			<td class="indexTable-body-row-cell">
				<div
					class="pr-u-ellipsis pr-u-widthFitContent pr-u-focusVisible pr-u-borderRadiusM"
					luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				>
					Tooltip
				</div>
			</td>
			<td class="indexTable-body-row-cell pr-u-whiteSpaceNowrap">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight mod-actions" (click)="$event.stopPropagation()">
				<button
					luTooltip="Secondary action (you can click)"
					luTooltipOnlyForDisplay
					(click)="message('Secondary action (on button)')"
					type="button"
					class="button mod-critical indexTable-body-row-cell-subAction"
				>
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
				</button>
			</td>
		</tr>
		<tr class="indexTable-body-row pr-u-cursorPointer" (click)="message('Primary action (on row)')">
			<td class="indexTable-body-row-cell">
				<button type="button" class="indexTable-body-row-cell-link"><span class="pr-u-mask">See details</span></button>
				<div
					class="pr-u-ellipsis pr-u-widthFitContent pr-u-maxInlineSize100% pr-u-focusVisible pr-u-borderRadiusM"
					luTooltip="Primary action (you can click)"
				>
					Tooltip for the cell
					<code class="code">button</code>
				</div>
			</td>
			<td class="indexTable-body-row-cell">
				<div class="pr-u-ellipsis pr-u-focusVisible pr-u-borderRadiusSmall" luTooltip luTooltipWhenEllipsis>
					Tooltip when ellipsis
				</div>
			</td>
			<td
				class="indexTable-body-row-cell pr-u-whiteSpaceNowrap mod-allowTextSelection pr-u-cursorDefault"
				(click)="$event.stopPropagation()"
			>
				<span class="pr-u-cursorText">Selectable</span>
			</td>
			<td class="indexTable-body-row-cell">
				<div
					class="pr-u-ellipsis pr-u-widthFitContent pr-u-focusVisible pr-u-borderRadiusM"
					luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				>
					Tooltip
				</div>
			</td>
			<td class="indexTable-body-row-cell pr-u-whiteSpaceNowrap">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight mod-actions">
				<button
					luTooltip="Secondary action (you can click)"
					luTooltipOnlyForDisplay
					(click)="$event.stopPropagation(); message('Secondary action (on button)')"
					type="button"
					class="button mod-critical indexTable-body-row-cell-subAction"
				>
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
				</button>
			</td>
		</tr>
	</tbody>
</table>
```

### Table actions tooltipsRow

<callout background="1">

Le clic sur la cellule est automatiquement désactivée par le tooltip. Il est possible de récupérer ce clic en ajoutant `(click)="..."` sur les `td` concernés.

</callout>

### Cellule

### Ligne

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/code';
```

```html
<table class="indexTable mod-layoutFixed">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Action</th>
			<th class="indexTable-head-row-cell" scope="col">Content</th>
			<th class="indexTable-head-row-cell" scope="col">Content</th>
			<th class="indexTable-head-row-cell" scope="col">Content</th>
			<th class="indexTable-head-row-cell" scope="col" style="--components-indexTable-cell-fixed-width: 8">Content</th>
			<th
				class="indexTable-head-row-cell mod-alignRight"
				scope="col"
				style="--components-indexTable-cell-fixed-width: 3"
			>
				<span class="pr-u-mask">Secondary action</span>
			</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row pr-u-cursorPointer" #line1 (click)="message('Primary action (on row)')">
			<td class="indexTable-body-row-cell">
				<!-- preventDefault is only here for demonstration -->
				<a
					href="#primaryNavigation"
					luTooltip="Primary action (you can click)"
					[luTooltipAnchor]="line1"
					class="indexTable-body-row-cell-link pr-u-ellipsis"
					(click)=" $event.preventDefault(); $event.stopPropagation(); message('Primary action (on link)')"
				>
					Tooltip for the row
					<code class="code">a</code>
				</a>
			</td>
			<td class="indexTable-body-row-cell">
				<div class="pr-u-ellipsis pr-u-focusVisible pr-u-borderRadiusSmall" luTooltip luTooltipWhenEllipsis>
					Tooltip when ellipsis
				</div>
			</td>
			<td
				class="indexTable-body-row-cell pr-u-whiteSpaceNowrap mod-allowTextSelection pr-u-cursorDefault"
				(click)="$event.stopPropagation()"
			>
				<span class="pr-u-cursorText">Selectable</span>
			</td>
			<td class="indexTable-body-row-cell">
				<div
					class="pr-u-ellipsis pr-u-widthFitContent pr-u-focusVisible pr-u-borderRadiusM"
					luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				>
					Tooltip
				</div>
			</td>
			<td class="indexTable-body-row-cell pr-u-whiteSpaceNowrap">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight mod-actions">
				<button
					luTooltip="Secondary action (you can click)"
					luTooltipOnlyForDisplay
					(click)="$event.stopPropagation(); message('Secondary action (on button)')"
					type="button"
					class="button mod-critical indexTable-body-row-cell-subAction"
				>
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
				</button>
			</td>
		</tr>
		<tr class="indexTable-body-row pr-u-cursorPointer" #line2 (click)="message('Primary action (on row)')">
			<td class="indexTable-body-row-cell">
				<button
					luTooltip="Primary action (you can click)"
					[luTooltipAnchor]="line2"
					type="button"
					class="indexTable-body-row-cell-link pr-u-ellipsis"
				>
					Tooltip for the row
					<code class="code">button</code>
				</button>
			</td>
			<td class="indexTable-body-row-cell">
				<div class="pr-u-ellipsis pr-u-focusVisible pr-u-borderRadiusSmall" luTooltip luTooltipWhenEllipsis>
					Tooltip when ellipsis
				</div>
			</td>
			<td
				class="indexTable-body-row-cell pr-u-whiteSpaceNowrap mod-allowTextSelection pr-u-cursorDefault"
				(click)="$event.stopPropagation()"
			>
				<span class="pr-u-cursorText">Selectable</span>
			</td>
			<td class="indexTable-body-row-cell">
				<div
					class="pr-u-ellipsis pr-u-widthFitContent pr-u-focusVisible pr-u-borderRadiusM"
					luTooltip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				>
					Tooltip
				</div>
			</td>
			<td class="indexTable-body-row-cell pr-u-whiteSpaceNowrap">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight mod-actions">
				<button
					luTooltip="Secondary action (you can click)"
					luTooltipOnlyForDisplay
					(click)="$event.stopPropagation(); message('Secondary action (on button)')"
					type="button"
					class="button mod-critical indexTable-body-row-cell-subAction"
				>
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
				</button>
			</td>
		</tr>
	</tbody>
</table>
```

### Table actions userPopover

```css
@forward '@lucca-front/scss/src/components/index-table';
```

```html
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<button class="indexTable-body-row-cell-link" type="button"><span class="pr-u-mask">See details</span></button>
				<button class="userPopover_trigger" [luUserPopover]="bob">
					<span>
						<lu-user-picture size="XS" [user]="bob" />
						<span translate="no" class="pr-u-marginInlineStart100">{{ bob | luUserDisplay:'lf' }}</span>
						with userPopover
					</span>
				</button>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>
```

### Table basic

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/code';
```

```html
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">
					Content
					<code class="code">a</code>
				</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">
					Content
					<code class="code">a</code>
				</a>
			</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<button type="button" class="indexTable-body-row-cell-link">
					Content
					<code class="code">button</code>
				</button>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>
```

### Table empty state

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/bubbleIllustration';
@forward '@lucca-front/scss/src/components/emptyState';
```

```html
<table class="indexTable" role="presentation">
	<thead class="indexTable-head" inert="inert">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell" colspan="3">
				<section class="emptyState">
					<div class="emptyState-container">
						<div class="emptyState-content">
							<div class="emptyState-content-icon" aria-hidden="true">
								<div
									class="bubbleIllustration mod-L"
									aria-hidden="true"
									[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/bubble-illustration/magnifyingGlass.svg' | luSafeExternalSvg"
								></div>
							</div>
							<div class="emptyState-content-text">
								<h3 class="emptyState-content-heading">Empty State</h3>
								<p class="emptyState-content-description">
									Flatus obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos potest vile
									diversitate flatus.
								</p>
							</div>
						</div>
					</div>
				</section>
			</td>
		</tr>
	</tbody>
</table>
```

### Table footer

```css
@forward '@lucca-front/scss/src/components/index-table';
```

```html
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell mod-alignRight" scope="col">Amount</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight">100,00 €</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight">50,00 €</td>
		</tr>
	</tbody>
	<tfoot class="indexTable-foot">
		<tr class="indexTable-foot-row">
			<td class="indexTable-foot-row-cell" colspan="3">
				Total:
				<strong>150,00 €</strong>
			</td>
		</tr>
	</tfoot>
</table>
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell mod-alignRight" scope="col">Amount</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight">126,00 €</td>
		</tr>
		<tr class="indexTable-foot-row">
			<td class="indexTable-foot-row-cell" colspan="3">
				Total:
				<strong>8074,8 €</strong>
			</td>
		</tr>
	</tbody>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight">133,00 €</td>
		</tr>
		<tr class="indexTable-foot-row">
			<td class="indexTable-foot-row-cell" colspan="3">
				Total:
				<strong>133,00 €</strong>
			</td>
		</tr>
	</tbody>
</table>
```

### Table input

```css
@forward '@lucca-front/scss/src/components/index-table';
```

```html
<table class="indexTable mod-selectable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<label class="indexTable-body-row-cell-link" for="myInput">
					<span>Importer un ficher</span>
				</label>
				<input
					id="myInput"
					type="file"
					accept=".pdf, .jpg, .jpeg, .png"
					class="indexTable-body-row-cell-link pr-u-mask"
				/>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>
```

### Table interactive nested selectable

```css
@forward '@lucca-front/scss/src/components/index-table';
```

### Table layout fixed responsive

### Responsive

```css
@forward '@lucca-front/scss/src/components/index-table';
```

```html
<table class="indexTable mod-layoutFixedAtMediaMinS pr-u-marginBlockEnd300">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col" style="--components-indexTable-cell-fixed-width: 15">
				15rem column
			</th>
			<th class="indexTable-head-row-cell" scope="col" style="--components-indexTable-cell-fixed-width: 10">
				10rem column
			</th>
			<th class="indexTable-head-row-cell" scope="col" style="--components-indexTable-cell-fixed-width: 6">6rem col</th>
			<th class="indexTable-head-row-cell" scope="col">Auto width column</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content content</td>
		</tr>
	</tbody>
</table>
```

### Table layout fixed

### Responsive

```css
@forward '@lucca-front/scss/src/components/index-table';
```

```html
<table class="indexTable mod-layoutFixed">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col" style="--components-indexTable-cell-fixed-width: 15">
				15rem column
			</th>
			<th class="indexTable-head-row-cell" scope="col" style="--components-indexTable-cell-fixed-width: 10">
				10rem column
			</th>
			<th class="indexTable-head-row-cell" scope="col" style="--components-indexTable-cell-fixed-width: 6">6rem col</th>
			<th class="indexTable-head-row-cell" scope="col">Auto width column</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content content</td>
		</tr>
	</tbody>
</table>
```

### Table mass selection and pagination

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/checkboxField';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/pagination';
```

```html
<div class="indexTableWrapper">
	<table class="indexTable mod-selectable">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-transparentCell" scope="col">
					<label class="formLabel pr-u-mask" for="allchbx">Select all items</label>
					<span class="checkboxField indexTable-head-row-cell-checkbox">
						<input
							class="checkboxField-input"
							checked
							type="checkbox"
							id="allchbx"
							aria-controls="r0chbx r1chbx r2chbx"
						/>
						<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
					</span>
				</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
			</tr>
			<tr class="indexTable-head-row mod-massSelection">
				<th class="indexTable-head-row-cell" colspan="4">
					<div class="indexTable-head-row-cell-massSelection">
						<span>3 selected items</span>
						<button class="button palette-product" type="button">Select all items</button>
					</div>
				</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-transparentCell">
					<label class="formLabel pr-u-mask" for="r0chbx">Select this item</label>
					<span class="checkboxField indexTable-body-row-cell-checkbox">
						<input class="checkboxField-input" checked type="checkbox" id="r0chbx" />
						<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
					</span>
				</td>
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-transparentCell">
					<label class="formLabel pr-u-mask" for="r1chbx">Select this item</label>
					<span class="checkboxField indexTable-body-row-cell-checkbox">
						<input class="checkboxField-input" checked type="checkbox" id="r1chbx" />
						<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
					</span>
				</td>
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
		</tbody>
	</table>
	<nav class="pagination" role="navigation" aria-label="Pagination des résultats">
		<div class="pagination-count">
			<span class="pagination-count-current">
				<span class="pr-u-mask">Résultats de</span>
				1
				<span aria-hidden="true">–</span>
				<span class="pr-u-mask">à</span>
				10
			</span>
			<span class="pagination-count-separator">sur</span>
			<span class="pagination-count-total">
				50
				<span class="pr-u-mask">pages</span>
			</span>
		</div>
		<div class="pagination-scrolling">
			<button type="button" class="button mod-onlyIcon mod-ghost mod-S" disabled>
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronLeft"></span>
				<span class="pr-u-mask">Précédent</span>
			</button>
			<button type="button" class="button mod-onlyIcon mod-ghost mod-S">
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronRight"></span>
				<span class="pr-u-mask">Suivant</span>
			</button>
		</div>
	</nav>
</div>
```

### Table nested selectable

### Sous-total

### Sélection

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/checkboxField';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/numericBadge';
```

```html
<table class="indexTable mod-selectable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-transparentCell" scope="col">
				<label class="formLabel pr-u-mask" for="allchbx">Select all items</label>
				<span class="checkboxField indexTable-head-row-cell-checkbox">
					<input
						class="checkboxField-input"
						type="checkbox"
						id="allchbx"
						checked
						aria-checked="mixed"
						aria-controls="r0chbx r1chbx r2chbx r3chbx r4chbx r5chbx r6chbx r7chbx r8chbx"
					/>
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-head-row-transparentCell" scope="col"></th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row" id="r0">
			<th class="indexTable-body-row-transparentCell">
				<label class="formLabel pr-u-mask" for="r0chbx">Select all lines for 2021</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input
						class="checkboxField-input"
						checked
						aria-checked="mixed"
						type="checkbox"
						id="r0chbx"
						aria-controls="r1chbx r2chbx r3chbx r4chbx r5chbx"
					/>
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="4" id="y2021">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true"
						aria-controls="r1 r2 r3 r4 r5"
						type="button"
						id="r0btn"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">2021</span>
					<span class="numericBadge">3</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r1">
			<th class="indexTable-body-row-transparentCell" headers="y2021" colspan="2">
				<label class="formLabel pr-u-mask" for="r1chbx">Select all items for september 2021</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r1chbx" aria-controls="r2chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="3" id="september" headers="y2021">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true"
						aria-controls="r2"
						type="button"
						id="r1btn"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">September</span>
					<span class="numericBadge">1</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r2">
			<td class="indexTable-body-row-transparentCell" headers="y2021 september" colspan="2">
				<label class="formLabel pr-u-mask" for="r2chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r2chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021 september">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021 september">Content</td>
			<td class="indexTable-body-row-cell" headers="y2021 september">Content</td>
		</tr>
		<tr class="indexTable-body-row" id="r3">
			<th class="indexTable-body-row-transparentCell" headers="y2021" colspan="2">
				<label class="formLabel pr-u-mask" for="r3chbx">Select all items for october 2021</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input
						class="checkboxField-input"
						type="checkbox"
						id="r3chbx"
						aria-controls="r4chbx r5chbx"
						checked
						aria-checked="mixed"
					/>
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="3" id="october" headers="y2021">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true"
						aria-controls="r4 r5"
						type="button"
						id="r3btn"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">October</span>
					<span class="numericBadge">2</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r4">
			<td class="indexTable-body-row-transparentCell" headers="y2021 october" colspan="2">
				<label class="formLabel pr-u-mask" for="r4chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" checked id="r4chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021 october">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021 october">Content</td>
			<td class="indexTable-body-row-cell" headers="y2021 october">Content</td>
		</tr>
		<tr class="indexTable-body-row" id="r5">
			<td class="indexTable-body-row-transparentCell" headers="y2021 october" colspan="2">
				<label class="formLabel pr-u-mask" for="r5chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r5chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021 october">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021 october">Content</td>
			<td class="indexTable-body-row-cell" headers="y2021 october">Content</td>
		</tr>
	</tbody>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row" id="r6">
			<th class="indexTable-body-row-transparentCell">
				<label class="formLabel pr-u-mask" for="r6chbx">Select all items for 2022</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r6chbx" aria-controls="r7chbx r8chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="4" id="y2022">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true"
						aria-controls="r7 r8"
						type="button"
						id="r6btn"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">2022</span>
					<span class="numericBadge">1</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r7">
			<th class="indexTable-body-row-transparentCell" headers="y2022" colspan="2">
				<label class="formLabel pr-u-mask" for="r7chbx">Select all items for january 2022</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r7chbx" aria-controls="r8chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="3" id="january" headers="y2022">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true"
						aria-controls="r8"
						type="button"
						id="r7btn"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">January</span>
					<span class="numericBadge">1</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r8">
			<td class="indexTable-body-row-transparentCell" headers="y2022 january" colspan="2">
				<label class="formLabel pr-u-mask" for="r8chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r8chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell" headers="y2022 january">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2022 january">Content</td>
			<td class="indexTable-body-row-cell" headers="y2022 january">Content</td>
		</tr>
	</tbody>
</table>
```

### Table nested sub totals

### Sous-total

### Sélection

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/numericBadge';
```

```html
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell mod-alignRight" scope="col">Value</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row" id="r0">
			<th class="indexTable-body-row-transparentCell" colspan="2" id="y2021">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true"
						aria-controls="r1 r2 r3 r4"
						type="button"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">2021</span>
					<span class="numericBadge">3</span>
				</div>
			</th>
			<th class="indexTable-body-row-transparentCell mod-alignRight">
				<div class="indexTable-body-row-subTotal">
					<span class="pr-u-bodyS">Sub total :</span>
					<strong>7999.10 €</strong>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r1">
			<td class="indexTable-body-row-cell" headers="y2021">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight" headers="y2021">
				<strong>170.00 €</strong>
			</td>
		</tr>
		<tr class="indexTable-body-row" id="r2">
			<td class="indexTable-body-row-cell" headers="y2021">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight" headers="y2021">
				<strong>50.30 €</strong>
			</td>
		</tr>
		<tr class="indexTable-body-row" id="r3">
			<td class="indexTable-body-row-cell" headers="y2021">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight" headers="y2021">
				<strong>7778.80 €</strong>
			</td>
		</tr>
		<tr class="indexTable-foot-row" id="r4">
			<td class="indexTable-foot-row-cell" headers="y2021" colspan="3">
				<span class="pr-u-bodyS">Sub total :</span>
				<strong>7999.10 €</strong>
			</td>
		</tr>
	</tbody>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row" id="r5">
			<th class="indexTable-body-row-transparentCell" colspan="2" id="y2022">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true"
						aria-controls="r6 r7"
						type="button"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">2022</span>
					<span class="numericBadge">1</span>
				</div>
			</th>
			<th class="indexTable-body-row-transparentCell mod-alignRight">
				<div class="indexTable-body-row-subTotal">
					<span class="pr-u-bodyS">Sub total :</span>
					<strong>200.00 €</strong>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r6">
			<td class="indexTable-body-row-cell" headers="y2022">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2022">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight" headers="y2022">
				<strong>200.00 €</strong>
			</td>
		</tr>
		<tr class="indexTable-foot-row" id="r7">
			<td class="indexTable-foot-row-cell" headers="y2022" colspan="3">
				<span class="pr-u-bodyS">Sub total :</span>
				<strong>200.00 €</strong>
			</td>
		</tr>
	</tbody>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row" id="r8">
			<th class="indexTable-body-row-transparentCell" colspan="2" id="y2023">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="false"
						aria-controls="r9 r10"
						type="button"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">2023</span>
					<span class="numericBadge">1</span>
				</div>
			</th>
			<th class="indexTable-body-row-transparentCell mod-alignRight">
				<div class="indexTable-body-row-subTotal">
					<span class="pr-u-bodyS">Sub total :</span>
					<strong>212.25 €</strong>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row is-closed" id="r9">
			<td class="indexTable-body-row-cell" headers="y2023">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2023">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight" headers="y2023">
				<strong>212.25 €</strong>
			</td>
		</tr>
		<tr class="indexTable-foot-row is-closed" id="r10">
			<td class="indexTable-foot-row-cell" headers="y2023" colspan="3">
				<span class="pr-u-bodyS">Sub total :</span>
				<strong>212.25 €</strong>
			</td>
		</tr>
	</tbody>
	<tfoot class="indexTable-foot">
		<tr class="indexTable-foot-row">
			<td class="indexTable-foot-row-cell" colspan="3">
				<span class="pr-u-bodyS">Total:</span>
				<strong>8411.35 €</strong>
			</td>
		</tr>
	</tfoot>
</table>
```

### Table nested

### Sous-total

### Sélection

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/numericBadge';
```

```html
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row" id="r0">
			<th class="indexTable-body-row-transparentCell" colspan="3" id="y2021">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true"
						aria-controls="r1 r2 r3"
						type="button"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">2021</span>
					<span class="numericBadge">
						3
						<span class="pr-u-mask"> lines</span>
					</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r1">
			<td class="indexTable-body-row-cell" headers="y2021">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021">Content</td>
			<td class="indexTable-body-row-cell" headers="y2021">Content</td>
		</tr>
		<tr class="indexTable-body-row" id="r2">
			<td class="indexTable-body-row-cell" headers="y2021">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021">Content</td>
			<td class="indexTable-body-row-cell" headers="y2021">Content</td>
		</tr>
		<tr class="indexTable-body-row" id="r3">
			<td class="indexTable-body-row-cell" headers="y2021">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021">Content</td>
			<td class="indexTable-body-row-cell" headers="y2021">Content</td>
		</tr>
	</tbody>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row" id="r4">
			<th class="indexTable-body-row-transparentCell" colspan="3" id="y2022">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true"
						aria-controls="r5"
						type="button"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">2022</span>
					<span class="numericBadge">
						1
						<span class="pr-u-mask"> line</span>
					</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r5">
			<td class="indexTable-body-row-cell" headers="y2022">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2022">Content</td>
			<td class="indexTable-body-row-cell" headers="y2022">Content</td>
		</tr>
	</tbody>
</table>
```

### Table pagination

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/pagination';
```

```html
<div class="indexTableWrapper">
	<table class="indexTable">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
			</tr>
		</tbody>
	</table>
	<nav class="pagination" role="navigation" aria-label="Pagination des résultats">
		<div class="pagination-count">
			<span class="pagination-count-current">
				<span class="pr-u-mask">Résultats de</span>
				1
				<span aria-hidden="true">–</span>
				<span class="pr-u-mask">à</span>
				10
			</span>
			<span class="pagination-count-separator">sur</span>
			<span class="pagination-count-total">
				50
				<span class="pr-u-mask">pages</span>
			</span>
		</div>
		<div class="pagination-scrolling">
			<button type="button" class="button mod-onlyIcon mod-ghost mod-S" disabled>
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronLeft"></span>
				<span class="pr-u-mask">Précédent</span>
			</button>
			<button type="button" class="button mod-onlyIcon mod-ghost mod-S">
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronRight"></span>
				<span class="pr-u-mask">Suivant</span>
			</button>
		</div>
	</nav>
</div>
```

### Table responsive card list custom

### Labels

### Nested

### Custom

```css
@forward '@lucca-front/scss/src/components/index-table';
```

```html
<style>
	/** .mytable is an example of a custom user css grid template */
	.myTable {
		--components-indexTable-row-responsive-grid-template-columns: 1fr 1fr;
		--components-indexTable-row-responsive-grid-template-areas: "title total" "text text";
	}
	.myTable .indexTable-body-row-cell:first-child {
		grid-area: title;
	}
	.myTable .indexTable-body-row-cell:nth-child(2) {
		grid-area: text;
	}
	.myTable .indexTable-body-row-cell:nth-child(3) {
		grid-area: total;
		text-align: end;
	}
</style>
<table class="indexTable mod-responsiveCardList myTable pr-u-marginBlockEnd300">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Lorem</th>
			<th class="indexTable-head-row-cell" scope="col">Ipsum</th>
			<th class="indexTable-head-row-cell" scope="col">Dolorem</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Lorem</a>
			</td>
			<td class="indexTable-body-row-cell">Aliquam vestibulum pulvinar luctus</td>
			<td class="indexTable-body-row-cell"><strong>122,00 €</strong></td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Lorem</a>
			</td>
			<td class="indexTable-body-row-cell">
				Phasellus ullamcorper vehicula diam in dignissim. Mauris cursus volutpat leo eu convallis. Sed sed scelerisque
				libero
			</td>
			<td class="indexTable-body-row-cell"><strong>56,50 €</strong></td>
		</tr>
	</tbody>
</table>
```

### Table responsive card list label

### Labels

### Nested

### Custom

```css
@forward '@lucca-front/scss/src/components/index-table';
```

```html
<table class="indexTable mod-responsiveCardList">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label 1</th>
			<th class="indexTable-head-row-cell" scope="col">Label 2</th>
			<th class="indexTable-head-row-cell" scope="col">Label 3</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<div class="indexTable-body-row-cell-content" data-label="Label 1">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</div>
			</td>
			<td class="indexTable-body-row-cell">
				<div class="indexTable-body-row-cell-content" data-label="Label 2">Content</div>
			</td>
			<td class="indexTable-body-row-cell">
				<div class="indexTable-body-row-cell-content" data-label="Label 3">Content</div>
			</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<div class="indexTable-body-row-cell-content" data-label="Label 1">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</div>
			</td>
			<td class="indexTable-body-row-cell">
				<div class="indexTable-body-row-cell-content" data-label="Label 2">Content</div>
			</td>
			<td class="indexTable-body-row-cell">
				<div class="indexTable-body-row-cell-content" data-label="Label 3">Content</div>
			</td>
		</tr>
	</tbody>
</table>
```

### Table responsive card list nested

### Labels

### Nested

### Custom

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/checkboxField';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/numericBadge';
```

```html
<table class="indexTable mod-selectable mod-stackable mod-responsiveCardList">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-transparentCell" scope="col">
				<label class="formLabel pr-u-mask" for="allchbx">Select all items</label>
				<span class="checkboxField indexTable-head-row-cell-checkbox">
					<input
						class="checkboxField-input"
						type="checkbox"
						id="allchbx"
						checked
						aria-checked="mixed"
						aria-controls="r0chbx r1chbx r2chbx r3chbx r4chbx r5chbx r6chbx r7chbx r8chbx"
					/>
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-head-row-transparentCell" scope="col"></th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row" id="r0">
			<th class="indexTable-body-row-transparentCell">
				<label class="formLabel pr-u-mask" for="r0chbx">Select all lines for 2021</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input
						class="checkboxField-input"
						checked
						aria-checked="mixed"
						type="checkbox"
						id="r0chbx"
						aria-controls="r1chbx r2chbx r3chbx r4chbx r5chbx"
					/>
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="4" id="y2021">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true"
						aria-controls="r1 r2 r3 r4 r5"
						type="button"
						id="r0btn"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">2021</span>
					<span class="numericBadge">3</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r1">
			<th class="indexTable-body-row-transparentCell" headers="y2021" colspan="2">
				<label class="formLabel pr-u-mask" for="r1chbx">Select all items for september 2021</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r1chbx" aria-controls="r2chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="3" id="september" headers="y2021">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true"
						aria-controls="r2"
						type="button"
						id="r1btn"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">September</span>
					<span class="numericBadge">1</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r2">
			<td class="indexTable-body-row-transparentCell" headers="y2021 september" colspan="2">
				<label class="formLabel pr-u-mask" for="r2chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r2chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021 september">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021 september">Content</td>
			<td class="indexTable-body-row-cell" headers="y2021 september">Content</td>
		</tr>
		<tr class="indexTable-body-row" id="r3">
			<th class="indexTable-body-row-transparentCell" headers="y2021" colspan="2">
				<label class="formLabel pr-u-mask" for="r3chbx">Select all items for october 2021</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input
						class="checkboxField-input"
						type="checkbox"
						id="r3chbx"
						aria-controls="r4chbx r5chbx"
						checked
						aria-checked="mixed"
					/>
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="3" id="october" headers="y2021">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true"
						aria-controls="r4 r5"
						type="button"
						id="r3btn"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">October (stacks for test !)</span>
					<span class="numericBadge">2</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row mod-stack3" id="r4">
			<td class="indexTable-body-row-transparentCell" headers="y2021 october" colspan="2">
				<label class="formLabel pr-u-mask" for="r4chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" checked id="r4chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021 october">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021 october">Content</td>
			<td class="indexTable-body-row-cell" headers="y2021 october">Content</td>
		</tr>
		<tr class="indexTable-body-row" id="r5">
			<td class="indexTable-body-row-transparentCell" headers="y2021 october" colspan="2">
				<label class="formLabel pr-u-mask" for="r5chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r5chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021 october">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2021 october">Content</td>
			<td class="indexTable-body-row-cell" headers="y2021 october">Content</td>
		</tr>
	</tbody>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row" id="r6">
			<th class="indexTable-body-row-transparentCell">
				<label class="formLabel pr-u-mask" for="r6chbx">Select all items for 2022</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r6chbx" aria-controls="r7chbx r8chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="4" id="y2022">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true"
						aria-controls="r7 r8"
						type="button"
						id="r6btn"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">2022</span>
					<span class="numericBadge">1</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r7">
			<th class="indexTable-body-row-transparentCell" headers="y2022" colspan="2">
				<label class="formLabel pr-u-mask" for="r7chbx">Select all items for january 2022</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r7chbx" aria-controls="r8chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="3" id="january" headers="y2022">
				<div class="indexTable-body-row-cellTitle">
					<button
						class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true"
						aria-controls="r8"
						type="button"
						id="r7btn"
					>
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="pr-u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">January</span>
					<span class="numericBadge">1</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r8">
			<td class="indexTable-body-row-transparentCell" headers="y2022 january" colspan="2">
				<label class="formLabel pr-u-mask" for="r8chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r8chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell" headers="y2022 january">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell" headers="y2022 january">Content</td>
			<td class="indexTable-body-row-cell" headers="y2022 january">Content</td>
		</tr>
	</tbody>
</table>
```

### Table responsive card list

### Labels

### Nested

### Custom

```css
@forward '@lucca-front/scss/src/components/index-table';
```

```html
<table class="indexTable mod-responsiveCardList">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label 1</th>
			<th class="indexTable-head-row-cell" scope="col">Label 2</th>
			<th class="indexTable-head-row-cell" scope="col">Label 3</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>
```

### Table selectable

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/checkboxField';
@forward '@lucca-front/scss/src/components/formLabel';
```

```html
<table class="indexTable mod-selectable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-transparentCell" scope="col">
				<label class="formLabel pr-u-mask" for="allchbx">Select all items</label>
				<span class="checkboxField indexTable-head-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="allchbx" aria-controls="r0chbx r1chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-transparentCell">
				<label class="formLabel pr-u-mask" for="r0chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r0chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-transparentCell">
				<label class="formLabel pr-u-mask" for="r1chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r1chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>
```

### Table sortable

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/tableSortable'; // Import additionnel
```

```html
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Not sortable</th>
			<th class="indexTable-head-row-cell" scope="col">
				<button type="button" class="tableSortable button">
					Sortable
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell" scope="col" aria-sort="ascending">
				<button type="button" class="tableSortable button">
					Sorted ascending
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell" scope="col" aria-sort="descending">
				<button type="button" class="tableSortable button">
					Sorted descending
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell" scope="col" aria-sort="none">
				<button
					type="button"
					class="tableSortable button"
					onclick="
						switch (this.parentNode.getAttribute('aria-sort')) {
							case 'ascending':
								this.parentNode.setAttribute('aria-sort', 'descending');
								break;
							case 'descending':
								this.parentNode.setAttribute('aria-sort', 'none');
								break;
							default:
								this.parentNode.setAttribute('aria-sort', 'ascending');
						}
					"
				>
					Interactive
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>
```

### Table stackable

```css
@forward '@lucca-front/scss/src/components/index-table';
@forward '@lucca-front/scss/src/components/checkboxField';
@forward '@lucca-front/scss/src/components/formLabel';
```

```html
<table class="indexTable mod-selectable mod-stackable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-transparentCell" scope="col">
				<label class="formLabel pr-u-mask" for="allchbx">Select all items</label>
				<span class="checkboxField indexTable-head-row-cell-checkbox">
					<input
						class="checkboxField-input"
						type="checkbox"
						id="allchbx"
						aria-controls="r0chbx r1chbx r2chbx"
						checked
						aria-checked="mixed"
					/>
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-transparentCell">
				<label class="formLabel pr-u-mask" for="r1chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r0chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row mod-stack2">
			<td class="indexTable-body-row-transparentCell">
				<label class="formLabel pr-u-mask" for="r0chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r1chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row mod-stack3">
			<td class="indexTable-body-row-transparentCell">
				<label class="formLabel pr-u-mask" for="r2chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r2chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>
```

### Table sticky header

```css
@forward '@lucca-front/scss/src/components/index-table';
```

```html
<div class="demo-wrapper">
	<table class="indexTable mod-stickyHeader">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
		</tbody>
	</table>
</div>
```
