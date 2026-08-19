import { ChangeDetectionStrategy, Component, contentChildren, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
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
	readonly small = input(false, { transform: luBooleanAttribute });

	readonly sortableListItems = contentChildren(SortableListItemComponent, { descendants: true });
}
