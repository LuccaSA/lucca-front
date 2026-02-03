import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { ClearComponent } from '@lucca-front/ng/clear';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';

@Component({
	selector: 'lu-sortable-list-item',
	standalone: true,
	templateUrl: './sortable-list-item.component.html',
	styleUrl: './sortable-list-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [ClearComponent, CdkDragHandle, IconComponent, LuTooltipModule],
	host: {
		class: 'sortableList-item',
		'[class.mod-clickable]': 'clickable()',
		'[class.mod-S]': 'small()',
		role: 'listitem',
	},
})
export class SortableListItemComponent {
	/**
	 * Changes the text displayed by the sortable list item
	 */
	label = input.required<string>();

	/**
	 * Adds descriptive help text below the label
	 */
	helperMessage = input<string>();

	/**
	 * Sortable list item can be clickable
	 */
	clickable = input(false, { transform: booleanAttribute });

	/**
	 * Disabled the possibility to clear the sortable list item
	 */
	unclearable = input(false, { transform: booleanAttribute });

	/**
	 * Sortable list item can be draggable
	 */
	drag = input(false, { transform: booleanAttribute });

	/**
	 * Applies small size to segmented control tabs
	 */
	small = input(false, { transform: booleanAttribute });

	/**
	 * Emit event when click on clear
	 */
	delete = output<void>();
}
