# link — Code & Implementation

**Sommaire**

- Angular
  - Testing
  - Angular
  - Inside table
- HTML/CSS
  - Basic


📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-actions-link-angular-test--docs)

## Angular

### Testing

```js
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideRouter, RouterOutlet, Routes } from '@angular/router';
import { LinkComponent } from '@lucca-front/ng/link';
```

```html
<div>
	<a luLink="/first">Go to /first</a>
	<br />
	<a luLink="/second">Go to /second</a>
	<br />
	<a luLink [href]="url" target="_blank" external>Go to https://example.org</a>
</div>
<router-outlet />
```

### Angular

```js
import { provideRouter } from '@angular/router';
import { LinkComponent, luLinkTranslations } from '@lucca-front/ng/link';
```

```html
Routing :
<a luLink="./#example">Text link</a>
<br />
Routing (nouvelle fenêtre) :
<a luLink="./#example" external>Text link</a>
<br />
Routing (nouvelle fenêtre) uniquement au survol/focus/touch :
<a luLink="./#example" external hiddenIcon>Text link</a>
<br />
<br />
Lien :
<a href="https://www.example.org" luLink>Text link</a>
<br />
Lien (nouvelle fenêtre) :
<a href="https://www.example.org" luLink external>Text link</a>
<br />
Lien (nouvelle fenêtre) uniquement au survol/focus/touch :
<a href="https://www.example.org" luLink external hiddenIcon>Text link</a>
<br />
```

### Inside table

```js
import { AsyncPipe } from '@angular/common';
import { provideRouter, RouterLink } from '@angular/router';
import { DataTableBodyComponent, DataTableComponent, DataTableHeadComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent, DataTableRowComponent } from '@lucca-front/ng/data-table';
import { IndexTableActionComponent, IndexTableBodyComponent, IndexTableComponent, IndexTableHeadComponent, IndexTableRowCellComponent, IndexTableRowCellHeaderComponent, IndexTableRowComponent } from '@lucca-front/ng/index-table';
import { LinkComponent } from '@lucca-front/ng/link';
import { timer } from 'rxjs';
```

```html
<lu-data-table>
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow></tr>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell><a luLink href="https://www.example.org" external>External link</a></td>
			<td luDataTableCell>cell</td>
		</tr>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell><a luLink href="https://www.example.org" external>External link</a></td>
			<td luDataTableCell>cell</td>
		</tr>
	</tbody>
</lu-data-table>
<br />
<lu-index-table>
	<thead luIndexTableHead>
		<tr luIndexTableRow>
			<th luIndexTableCell>header</th>
			<th luIndexTableCell>header</th>
			<th luIndexTableCell>header</th>
		</tr>
	</thead>
	<tbody luIndexTableBody>
		<tr luIndexTableRow>
			<th luIndexTableCell>
				<a luIndexTableAction href="#">action</a>
			</th>
			<td luIndexTableCell><a luLink href="https://www.example.org" external>External link</a></td>
			<td luIndexTableCell>cell</td>
		</tr>
		<tr luIndexTableRow>
			<th luIndexTableCell>
				<a luIndexTableAction href="#">action</a>
			</th>
			<td luIndexTableCell><a luLink href="https://www.example.org" external>External link</a></td>
			<td luIndexTableCell>cell</td>
		</tr>
	</tbody>
</lu-index-table>
```


## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/link';
```

```html
<a href="#" class="link">Text link</a>
<br />
<br />
<a class="link mod-icon" href="#" target="_blank">
	Text link
	<!-- no text node here -->
	<span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span>
	<span class="pr-u-mask">Open in a new window</span>
</a>
```
