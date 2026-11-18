# reorder — Code & Implementation

**Sommaire**

- Angular
  - Basic
  - Lists restricted
  - Lists
  - Orientation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-listings-reorder-angular-basic--docs)

## Angular

### Basic

```js
import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { LOCALE_ID, signal } from '@angular/core';
import { LuReorderTranslations, luReorderTranslations, ReorderDirective, ReorderEvent, ReorderHandleComponent, ReorderItemLabelDirective, ReorderOptionalAction } from '@lucca-front/ng/reorder';
import { ACTIONS_EXCLUDED_ARG_TYPE, actionsExcludedValue, formatReorderEvent } from './connected-lists.helpers';
```

```html
<ul class="reorderDemo" cdkDropList luReorder [luReorderActionsExcluded]="" (luReorder)="onReorder($event)">
	@for (item of items; track item) {
		<li class="reorderDemo-item" cdkDrag [luReorderItemLabel]="item">
			<lu-reorder-handle />
			{{ item }}
		</li>
	}
</ul>
<pr-story-model-display heading="(luReorder)">{{ lastEvent() }}</pr-story-model-display>
```

### Lists restricted

```js
import { signal } from '@angular/core';
import { ReorderEvent } from '@lucca-front/ng/reorder';
import { TagComponent } from '@lucca-front/ng/tag';
import { acceptAll, CONNECTED_LISTS_ARG_TYPES, CONNECTED_LISTS_DECORATORS, refuseAll, formatReorderEvent, reorder, actionsExcludedValue, ReorderConnectedListsStory, STYLES } from './connected-lists.helpers';
```

```html
<div class="reorderDemo">
	@for (column of columns; track column.id) {
		<section class="reorderDemo-column">
			<h3 class="reorderDemo-column-title" [class.is-disabled]="column.closed">
				{{ column.label }}
				@if (column.closed) {
					<lu-tag label="Fermée" />
				}
			</h3>
			<ul
				class="reorderDemo-list"
				[class.is-disabled]="column.closed"
				cdkDropList
				[id]="column.id"
				[cdkDropListData]="column.items"
				[cdkDropListConnectedTo]="column.connectedTo"
				[cdkDropListEnterPredicate]="column.closed ? refuseAll : acceptAll"
				luReorder
				[luReorderLabel]="column.label"
				[luReorderActionsExcluded]=""
				(luReorder)="onReorder($event)"
			>
				@for (item of column.items; track item) {
					<li class="reorderDemo-list-item" cdkDrag [luReorderItemLabel]="item">
						<lu-reorder-handle />
						{{ item }}
					</li>
				}
			</ul>
		</section>
	}
</div>
<pr-story-model-display heading="(luReorder)">{{ lastEvent() }}</pr-story-model-display>
```

### Lists

```js
import { signal } from '@angular/core';
import { ReorderEvent } from '@lucca-front/ng/reorder';
import { CONNECTED_LISTS_ARG_TYPES, CONNECTED_LISTS_DECORATORS, formatReorderEvent, reorder, actionsExcludedValue, ReorderConnectedListsStory, STYLES } from './connected-lists.helpers';
```

```html
<div class="reorderDemo" cdkDropListGroup>
	@for (column of columns; track column.label) {
		<section class="reorderDemo-column">
			<h3 class="reorderDemo-column-title">{{ column.label }}</h3>
			<ul
				class="reorderDemo-list"
				cdkDropList
				[cdkDropListData]="column.items"
				luReorder
				[luReorderLabel]="column.label"
				[luReorderActionsExcluded]=""
				(luReorder)="onReorder($event)"
			>
				@for (item of column.items; track item) {
					<li class="reorderDemo-list-item" cdkDrag [luReorderItemLabel]="item">
						<lu-reorder-handle />
						{{ item }}
					</li>
				}
			</ul>
		</section>
	}
</div>
<pr-story-model-display heading="(luReorder)">{{ lastEvent() }}</pr-story-model-display>
```

### Orientation

```js
import { CdkDrag, CdkDropList, DropListOrientation, moveItemInArray } from '@angular/cdk/drag-drop';
import { LOCALE_ID, signal } from '@angular/core';
import { ReorderDirective, ReorderEvent, ReorderFlow, ReorderHandleComponent, ReorderItemLabelDirective, ReorderOptionalAction } from '@lucca-front/ng/reorder';
import { ACTIONS_EXCLUDED_ARG_TYPE, actionsExcludedValue, formatReorderEvent } from './connected-lists.helpers';
```

```html
<ul
	class="reorderDemo"
	cdkDropList
	cdkDropListOrientation="horizontal"
	luReorder
	[luReorderActionsExcluded]=""
	(luReorder)="onReorder($event)"
>
	@for (item of items; track item) {
		<li class="reorderDemo-item" cdkDrag [luReorderItemLabel]="item">
			<lu-reorder-handle />
			{{ item }}
		</li>
	}
</ul>
<pr-story-model-display heading="(luReorder)">{{ lastEvent() }}</pr-story-model-display>
```
