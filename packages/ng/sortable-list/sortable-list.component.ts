import { booleanAttribute, ChangeDetectionStrategy, Component, contentChildren, input, ViewEncapsulation } from '@angular/core';
import { SortableListItemComponent } from './sortable-list-item';

@Component({
	selector: 'lu-sortable-list',
	standalone: true,
	templateUrl: './sortable-list.component.html',
	styleUrl: './sortable-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class SortableListComponent {
	/**
	 * Applies small size to sortable list
	 */
	small = input(false, { transform: booleanAttribute });

	sortableListItems = contentChildren(SortableListItemComponent, { descendants: true });
}
