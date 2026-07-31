# data-table — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-listings-data-table-angular-basic--docs)

## Angular

Component selector : `lu-data-table`

### Sélection

L'option `selected` ajoute seulement une checkbox à l'ensemble des lignes du tableau. La sélection en elle-même n'est pas couverte par Lucca Front. 

`lucca-cdk` propose des outils de sélection, via [withSelectionFeature](https://github.com/LuccaSA/lucca-cdk/blob/c155fc21f98c9cac93e7b193046729702096966a/docs/src/content/docs/features/signal-store.md#withselectionfeature-exp%C3%A9rimental).

### Lien vers un nouvelle page

Dans un tableau, privilégiez l'attribut `external` sur vos liens. L'icône associée n'est alors visible qu'au survol : le tableau la masque automatiquement pour ne pas surcharger des cellules souvent denses.

### Basic

```js
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PaginationComponent } from '@lucca-front/ng/pagination';
```

```html
<lu-data-table>
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell>cell</td>
		</tr>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell>cell</td>
		</tr>
	</tbody>
</lu-data-table>
```

### Draggable

Le drag and drop est porté par Angular CDK [drag-drop](https://angular.dev/guide/drag-drop).

```js
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
```

### Inject

```js
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { PaginationComponent } from '@lucca-front/ng/pagination';
```

```html
<tr luDataTableRow>
	<th luDataTableCell>header</th>
	<td luDataTableCell>cell</td>
	<td luDataTableCell>cell</td>
	<td luDataTableCell>cell</td>
	<td luDataTableCell>cell</td>
	<td luDataTableCell>cell</td>
	<td luDataTableCell>cell</td>
	<td luDataTableCell>cell</td>
</tr>
```

```html
<lu-data-table>
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
		</tr>
		<tr-component />
	</tbody>
</lu-data-table>
```

### Overflow

```js
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { PaginationComponent } from '@lucca-front/ng/pagination';
```

```html
<lu-data-table>
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
		</tr>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
		</tr>
	</tbody>
</lu-data-table>
```

### Responsive

```js
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
@let layoutfixed =
	{
		layoutFixedAtMediaMinS: true,
	};
<lu-data-table [responsive]="layoutfixed">
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>header header header</th>
			<th luDataTableCell>header</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell>cell</td>
		</tr>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell>cell</td>
		</tr>
	</tbody>
</lu-data-table>
```

## HTML/CSS

Classe CSS : `.dataTable`

### Horizontal

```css
@forward '@lucca-front/scss/src/components/data-table';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell mod-alignCenter">Label</th>
				<th class="dataTable-head-row-cell mod-alignRight">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell mod-alignCenter">Text</td>
				<td class="dataTable-body-row-cell mod-alignRight">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell mod-alignCenter">Text</td>
				<td class="dataTable-body-row-cell mod-alignRight">Text</td>
			</tr>
		</tbody>
	</table>
</div>
```

### Vertical

```css
@forward '@lucca-front/scss/src/components/data-table';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable mod-alignTop">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">
					Text
					<br />
					Text
				</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">
					Text
					<br />
					Text
				</td>
			</tr>
		</tbody>
	</table>
</div>
```

### Basic

```css
@forward '@lucca-front/scss/src/components/data-table';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
		<tfoot class="dataTable-foot">
			<tr class="dataTable-foot-row">
				<td class="dataTable-foot-row-cell">Text</td>
				<td class="dataTable-foot-row-cell">Text</td>
				<td class="dataTable-foot-row-cell">Text</td>
			</tr>
		</tfoot>
	</table>
</div>
```

### Border

```css
@forward '@lucca-front/scss/src/components/data-table';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable mod-cellBorder">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell" rowspan="2">Label</th>
				<th class="dataTable-head-row-cell" colspan="2">Label</th>
			</tr>
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell" rowspan="2">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
	</table>
</div>
```

### Draggable

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell mod-draggable" aria-hidden="true"></th>
				<th class="dataTable-head-row-cell">Sortable column</th>
				<th class="dataTable-head-row-cell">Sortable column</th>
				<th class="dataTable-head-row-cell">Sortable column</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row mod-draggable">
				<td class="dataTable-body-row-cell" aria-hidden="true">
					<span class="button dataTable-body-row-cell-drag">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
					</span>
				</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
			<tr class="dataTable-body-row mod-draggable">
				<td class="dataTable-body-row-cell" aria-hidden="true">
					<span class="button dataTable-body-row-cell-drag">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
					</span>
				</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
			<tr class="dataTable-body-row mod-draggable">
				<td class="dataTable-body-row-cell" aria-hidden="true">
					<span class="button dataTable-body-row-cell-drag">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
					</span>
				</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
		</tbody>
	</table>
</div>
```

### Editable

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/textField';
```

```html
<form action="#">
	<div class="dataTableWrapper">
		<table class="dataTable">
			<thead class="dataTable-head">
				<tr class="dataTable-head-row">
					<th class="dataTable-head-row-cell">Label</th>
					<th class="dataTable-head-row-cell">Label</th>
					<th class="dataTable-head-row-cell">Label</th>
				</tr>
			</thead>
			<tbody class="dataTable-body">
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell mod-editable">
						<div class="form-field">
							<label class="formLabel pr-u-mask" id="IDlabel1" for="ID1">Label</label>
							<div class="textField">
								<div class="textField-input">
									<input
										value="Label"
										type="text"
										id="ID1"
										class="textField-input-value"
										aria-labelledby="IDlabel1 IDsuffix1"
									/>
								</div>
								<span class="textField-suffix" id="IDsuffix1">
									<span class="textField-label-suffix-item">€</span>
								</span>
							</div>
						</div>
					</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell mod-editable">
						<div class="form-field">
							<label class="formLabel pr-u-mask" id="IDlabel2" for="ID2">Label</label>
							<div class="textField">
								<div class="textField-input">
									<input
										value="Label"
										type="text"
										id="ID2"
										class="textField-input-value"
										aria-labelledby="IDlabel2 IDsuffix2"
									/>
								</div>
								<span class="textField-suffix" id="IDsuffix2">
									<span class="textField-label-suffix-item">€</span>
								</span>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</form>
```

### State

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/bubbleIllustration';
@forward '@lucca-front/scss/src/components/emptyState';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell" colspan="3">
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
</div>
```

### Columns responsive

### Responsive

```css
@forward '@lucca-front/scss/src/components/data-table';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable mod-layoutFixedAtMediaMinM">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell" [attr.style]="'--dataTable-layoutFixed-width: 10rem'">
					Fixed 10rem column
				</th>
				<th class="dataTable-head-row-cell" [attr.style]="'--dataTable-layoutFixed-width: 12rem'">
					Fixed 12rem column
				</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
		</tbody>
	</table>
</div>
```

### Columns

### Responsive

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/dataTableSticked'; // Import additionnel
```

```html
<div class="dataTableWrapper">
	<table class="dataTable mod-layoutFixed">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell" [attr.style]="'--dataTable-layoutFixed-width: 10rem'">Fixed 8rem column</th>
				<th class="dataTable-head-row-cell" [attr.style]="'--dataTable-layoutFixed-width: 12rem'">
					Fixed 12rem column
				</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
		</tbody>
	</table>
</div>
```

### Group

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/numericBadge';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row mod-group">
				<td class="dataTable-body-row-cell" colspan="3">
					<div class="dataTable-body-row-cell-expand">
						<button type="button" class="dataTable-body-row-cell-expand-button button" aria-expanded="false">
							<span aria-hidden="true" class="lucca-icon icon-arrowChevronTop"></span>
							<span class="pr-u-mask">Afficher 2 lignes supplémentaires</span>
						</button>
						<span class="dataTable-body-row-cell-expand-label">Text</span>
						<span class="numericBadge">7</span>
					</div>
				</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row mod-group">
				<td class="dataTable-body-row-cell" colspan="3">
					<div class="dataTable-body-row-cell-expand">
						<button type="button" class="dataTable-body-row-cell-expand-button button" aria-expanded="true">
							<span aria-hidden="true" class="lucca-icon icon-arrowChevronTop"></span>
							<span class="pr-u-mask">Afficher 2 lignes supplémentaires</span>
						</button>
						<span class="dataTable-body-row-cell-expand-label">Text</span>
						<span class="numericBadge">7</span>
					</div>
				</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
	</table>
</div>
```

### Hover

```css
@forward '@lucca-front/scss/src/components/data-table';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable mod-hover">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
		<tfoot class="dataTable-foot">
			<tr class="dataTable-foot-row">
				<td class="dataTable-foot-row-cell">Text</td>
				<td class="dataTable-foot-row-cell">Text</td>
				<td class="dataTable-foot-row-cell">Text</td>
			</tr>
		</tfoot>
	</table>
</div>
```

### Nested

```css
@forward '@lucca-front/scss/src/components/data-table';
```

```html
<div class="dataTableWrapper mod-nested">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
		<tfoot class="dataTable-foot">
			<tr class="dataTable-foot-row">
				<th class="dataTable-foot-row-cell">Text</th>
				<th class="dataTable-foot-row-cell">Text</th>
				<th class="dataTable-foot-row-cell">Text</th>
			</tr>
		</tfoot>
	</table>
</div>
```

### Both

```css
@forward '@lucca-front/scss/src/components/data-table';
```

```html
<div class="dataTableWrapper" style="inline-size: 30rem; height: 10rem">
	<div class="dataTableShadows">
		<table
			class="dataTable mod-columnsOverflow mod-rowsOverflow -is-firstColumnVisible -is-firstRowVisible -is-lastColumnVisible -is-lastRowVisible"
		>
			<thead class="dataTable-head">
				<tr class="dataTable-head-row">
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
				</tr>
			</thead>
			<tbody class="dataTable-body">
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
```

### Horizontal

```css
@forward '@lucca-front/scss/src/components/data-table';
```

```html
<div class="dataTableWrapper" style="inline-size: 30rem">
	<div class="dataTableShadows">
		<table class="dataTable mod-columnsOverflow -is-firstColumnVisible -is-lastColumnVisible">
			<thead class="dataTable-head">
				<tr class="dataTable-head-row">
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
				</tr>
			</thead>
			<tbody class="dataTable-body">
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
```

### Vertical

```css
@forward '@lucca-front/scss/src/components/data-table';
```

```html
<div class="dataTableWrapper" style="block-size: 10rem">
	<div class="dataTableShadows">
		<table class="dataTable mod-rowsOverflow -is-firstRowVisible -is-lastRowVisible">
			<thead class="dataTable-head">
				<tr class="dataTable-head-row">
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
				</tr>
			</thead>
			<tbody class="dataTable-body">
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
```

### Pagination

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/pagination';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
		<tfoot class="dataTable-foot">
			<tr class="dataTable-foot-row">
				<td class="dataTable-foot-row-cell">Text</td>
				<td class="dataTable-foot-row-cell">Text</td>
				<td class="dataTable-foot-row-cell">Text</td>
			</tr>
		</tfoot>
	</table>
	<nav class="pagination dataTableWrapper-pagination" role="navigation" aria-label="Pagination des résultats">
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

### Actions

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell mod-alignRight">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell mod-actions">
					<button type="button" class="button">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
						<span class="pr-u-mask">Edit</span>
					</button>
					<button type="button" class="button">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
						<span class="pr-u-mask">Delete</span>
					</button>
				</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell mod-actions">
					<button type="button" class="button">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
						<span class="pr-u-mask">Edit</span>
					</button>
					<button type="button" class="button">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
						<span class="pr-u-mask">Delete</span>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</div>
```

### Hover

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/checkboxField';
```

```html
<form action="#">
	<div class="dataTableWrapper">
		<table class="dataTable mod-hover">
			<thead class="dataTable-head">
				<tr class="dataTable-head-row mod-selectable">
					<th class="dataTable-head-row-cell">
						<span class="checkboxField">
							<input type="checkbox" class="checkboxField-input" id="CBall" />
							<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
						</span>
						<label class="pr-u-mask" for="CBall">Label</label>
					</th>
					<th class="dataTable-head-row-cell">Label</th>
					<th class="dataTable-head-row-cell">Label</th>
					<th class="dataTable-head-row-cell">Label</th>
				</tr>
			</thead>
			<tbody class="dataTable-body">
				<tr class="dataTable-body-row mod-selectable">
					<td class="dataTable-body-row-cell">
						<span class="checkboxField">
							<input type="checkbox" class="checkboxField-input" id="CB1" checked />
							<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
						</span>
						<label class="pr-u-mask" for="CB1">Label</label>
					</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
				</tr>
				<tr class="dataTable-body-row mod-selectable">
					<td class="dataTable-body-row-cell">
						<span class="checkboxField">
							<input type="checkbox" class="checkboxField-input" id="CB2" />
							<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
						</span>
						<label class="pr-u-mask" for="CB2">Label</label>
					</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
				</tr>
				<tr class="dataTable-body-row mod-selectable">
					<td class="dataTable-body-row-cell">
						<span class="checkboxField">
							<input type="checkbox" class="checkboxField-input" id="CB3" />
							<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
						</span>
						<label class="pr-u-mask" for="CB3">Label</label>
					</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
				</tr>
			</tbody>
			<tfoot class="dataTable-foot">
				<tr class="dataTable-foot-row mod-selectable">
					<th class="dataTable-foot-row-cell">
						<span class="checkboxField">
							<input type="checkbox" class="checkboxField-input" id="CBfooter" />
							<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
						</span>
						<label class="pr-u-mask" for="CBfooter">Text</label>
					</th>
					<th class="dataTable-foot-row-cell">Text</th>
					<th class="dataTable-foot-row-cell">Text</th>
					<th class="dataTable-foot-row-cell">Text</th>
				</tr>
			</tfoot>
		</table>
	</div>
</form>
```

### Selectable

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/checkboxField';
```

```html
<form action="#">
	<div class="dataTableWrapper">
		<table class="dataTable">
			<thead class="dataTable-head">
				<tr class="dataTable-head-row mod-selectable">
					<th class="dataTable-head-row-cell">
						<span class="checkboxField">
							<input type="checkbox" class="checkboxField-input" id="CBall" />
							<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
						</span>
						<label class="pr-u-mask" for="CBall">Label</label>
					</th>
					<th class="dataTable-head-row-cell">Label</th>
					<th class="dataTable-head-row-cell">Label</th>
					<th class="dataTable-head-row-cell">Label</th>
				</tr>
			</thead>
			<tbody class="dataTable-body">
				<tr class="dataTable-body-row mod-selectable">
					<td class="dataTable-body-row-cell">
						<span class="checkboxField">
							<input type="checkbox" class="checkboxField-input" id="CB1" checked />
							<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
						</span>
						<label class="pr-u-mask" for="CB1">Label</label>
					</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
				</tr>
				<tr class="dataTable-body-row mod-selectable">
					<td class="dataTable-body-row-cell">
						<span class="checkboxField">
							<input type="checkbox" class="checkboxField-input" id="CB2" />
							<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
						</span>
						<label class="pr-u-mask" for="CB2">Label</label>
					</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
				</tr>
			</tbody>
		</table>
	</div>
</form>
```

### Sort

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/tableSortable';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">
					<button type="button" class="tableSortable button">
						Label
						<span class="tableSortable-arrows">
							<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
							<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
						</span>
					</button>
				</th>
				<th class="dataTable-head-row-cell" aria-sort="ascending">
					<button type="button" class="tableSortable button">
						Label
						<span class="tableSortable-arrows">
							<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
							<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
						</span>
					</button>
				</th>
				<th class="dataTable-head-row-cell" aria-sort="descending">
					<button type="button" class="tableSortable button">
						Label
						<span class="tableSortable-arrows">
							<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
							<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
						</span>
					</button>
				</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
	</table>
</div>
```

### Columns multiple

```css
@forward '@lucca-front/scss/src/components/data-table';
```

```html
<div class="dataTableWrapper" style="inline-size: 30rem">
	<table class="dataTable mod-layoutFixed" [attr.style]="'--dataTable-layoutFixed-width: 5.5rem'">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell mod-stickyColumn">Head cell</th>
				<th class="dataTable-head-row-cell mod-stickyColumn" style="left: var(--dataTable-layoutFixed-width)">
					Head cell
				</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell mod-stickyColumn" style="right: var(--dataTable-layoutFixed-width)">
					Head cell
				</th>
				<th class="dataTable-head-row-cell mod-stickyColumn">Head cell</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="left: var(--dataTable-layoutFixed-width)">
					Body cell
				</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="right: var(--dataTable-layoutFixed-width)">
					Body cell
				</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="left: var(--dataTable-layoutFixed-width)">
					Body cell
				</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="right: var(--dataTable-layoutFixed-width)">
					Body cell
				</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="left: var(--dataTable-layoutFixed-width)">
					Body cell
				</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="right: var(--dataTable-layoutFixed-width)">
					Body cell
				</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="left: var(--dataTable-layoutFixed-width)">
					Body cell
				</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="right: var(--dataTable-layoutFixed-width)">
					Body cell
				</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
		</tbody>
	</table>
</div>
```

### Columns

```css
@forward '@lucca-front/scss/src/components/data-table';
```

```html
<div class="dataTableWrapper" style="inline-size: 30rem">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell mod-stickyColumn">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell mod-stickyColumn">Head cell</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
		</tbody>
	</table>
</div>
```

### Header columns

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/dataTableSticked'; // Import additionne
```

```html
<div class="dataTableWrapper" style="inline-size: 30rem; height: 10rem">
	<table class="dataTable mod-stickyHeader">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell mod-stickyColumn">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell mod-stickyColumn">Head cell</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
		</tbody>
	</table>
</div>
```

### Header

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/dataTableSticked'; // Import additionnel
```

```html
<div class="dataTableWrapper" style="block-size: 10rem">
	<table class="dataTable mod-stickyHeader">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
			</tr>
		</tbody>
	</table>
</div>
```

### Tree

```css
@forward '@lucca-front/scss/src/components/data-table';
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-tree">
					<div class="dataTable-body-row-cell-expand">
						<button type="button" class="dataTable-body-row-cell-expand-button button" aria-expanded="true">
							<span aria-hidden="true" class="lucca-icon icon-arrowChevronTop"></span>
							<span class="pr-u-mask">Afficher 2 lignes supplémentaires</span>
						</button>
						Text
					</div>
				</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-tree" [attr.style]="'--components-dataTable-treeLevel: 2'">
					<div class="dataTable-body-row-cell-expand">
						<button type="button" class="dataTable-body-row-cell-expand-button button" aria-expanded="false">
							<span aria-hidden="true" class="lucca-icon icon-arrowChevronTop"></span>
							<span class="pr-u-mask">Afficher 1 ligne supplémentaire</span>
						</button>
						Text
					</div>
				</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row is-collapsed">
				<td class="dataTable-body-row-cell mod-tree" [attr.style]="'--components-dataTable-treeLevel: 2'">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-tree">
					<div class="dataTable-body-row-cell-expand">
						<button type="button" class="dataTable-body-row-cell-expand-button button" aria-expanded="false">
							<span aria-hidden="true" class="lucca-icon icon-arrowChevronTop"></span>
							<span class="pr-u-mask">Afficher 1 ligne supplémentaire</span>
						</button>
						Text
					</div>
				</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-tree">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
	</table>
</div>
```
