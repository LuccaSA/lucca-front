import { booleanAttribute, ChangeDetectionStrategy, Component, contentChildren, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { SortableListItemComponent } from './sortable-list-item';
import { LU_SORTABLE_LIST_INSTANCE } from './sortable-list.token';

@Component({
	selector: 'lu-sortable-list',
	standalone: true,
	templateUrl: './sortable-list.component.html',
	styleUrl: './sortable-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: LU_SORTABLE_LIST_INSTANCE,
			useExisting: forwardRef(() => SortableListComponent),
		},
	],
})
export class SortableListComponent {
	small = input(false, { transform: booleanAttribute });

	sortableListItems = contentChildren(SortableListItemComponent, { descendants: true });
}
