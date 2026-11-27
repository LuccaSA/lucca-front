# novalue — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-texts-novalue-angular-basic--docs)

## Angular

### Basic

```js
import { IndexTableBodyComponent, IndexTableComponent, IndexTableHeadComponent, IndexTableRowCellComponent, IndexTableRowCellHeaderComponent, IndexTableRowComponent } from '@lucca-front/ng/index-table';
import { NoValueComponent } from '@lucca-front/ng/no-value';
```

```html
<lu-no-value />
```

## HTML/CSS

### Basic

```html
<span aria-hidden="true" data-content-before="—"></span>
<span class="pr-u-mask">Non renseigné</span>
```

### Cell

```css
@forward '@lucca-front/scss/src/components/indexTable';
```

```html
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Lorem ipsum</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell"><span aria-hidden="true" data-content-before="—"></span></td>
		</tr>
	</tbody>
</table>
```
