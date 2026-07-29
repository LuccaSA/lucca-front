# sortable-list — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-listings-sortable-list-angular-basic--docs)

## Angular

Le drag and drop est porté par Angular CDK [drag-drop](https://angular.dev/guide/drag-drop).

Mots-clés : triable, drag and drop, réorganisation

Component selector : `lu-sortable-list`

### Basic

```js
import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';
```

### Draggable

```js
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';
```

```html
<lu-sortable-list cdkDropList (cdkDropListDropped)="drop($event)">
	<lu-sortable-list-item label="Label" helperMessage="Helper message" drag cdkDrag />
	<lu-sortable-list-item label="Label" helperMessage="Helper message" drag cdkDrag />
	<lu-sortable-list-item label="Label" helperMessage="Helper message" drag cdkDrag />
</lu-sortable-list>
```

## HTML/CSS

Classe CSS : `.sortableList`

### List

```css
@forward '@lucca-front/scss/src/components/sortable-list';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/clear';
```

```html
<ul class="sortableList">
	<li class="sortableList-item">
		<span class="sortableList-item-handler button">
			<span class="lucca-icon icon-drag" aria-hidden="true"></span>
			<span class="pr-u-mask">Position 1. Utilisez les touches directionnelles pour réordonner</span>
		</span>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
	<li class="sortableList-item">
		<span class="sortableList-item-handler button">
			<span class="lucca-icon icon-drag" aria-hidden="true"></span>
			<span class="pr-u-mask">Position 1. Utilisez les touches directionnelles pour réordonner</span>
		</span>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
	<li class="sortableList-item">
		<span class="sortableList-item-handler button">
			<span class="lucca-icon icon-drag" aria-hidden="true"></span>
			<span class="pr-u-mask">Position 1. Utilisez les touches directionnelles pour réordonner</span>
		</span>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
</ul>
```

### List basic

```css
@forward '@lucca-front/scss/src/components/sortable-list';
@forward '@lucca-front/scss/src/components/clear';
```

```html
<ul class="sortableList">
	<li class="sortableList-item">
		<div class="sortableList-item-handler"></div>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span aria-hidden="true" class="lucca-icon icon-signClose"></span>
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
	<li class="sortableList-item">
		<div class="sortableList-item-handler"></div>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span aria-hidden="true" class="lucca-icon icon-signClose"></span>
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
	<li class="sortableList-item">
		<div class="sortableList-item-handler"></div>
		<div class="sortableList-item-content">
			<p class="sortableList-item-content-description">Label</p>
			<p class="sortableList-item-content-helper">Helper message</p>
		</div>
		<button class="clear sortableList-clear" type="button">
			<span aria-hidden="true" class="lucca-icon icon-signClose"></span>
			<span class="pr-u-mask">Delete</span>
		</button>
	</li>
</ul>
```
