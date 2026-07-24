# sortable-list — Draggable _(Angular)_

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
