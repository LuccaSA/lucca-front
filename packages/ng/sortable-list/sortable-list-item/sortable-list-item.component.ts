import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { ClearComponent } from '@lucca-front/ng/clear';

@Component({
	selector: 'lu-sortable-list-item',
	standalone: true,
	templateUrl: './sortable-list-item.component.html',
	styleUrl: './sortable-list-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [ClearComponent, CdkDragHandle],
	host: {
		class: 'sortableList-item',
		'[class.mod-clickable]': 'clickable()',
		role: 'listitem',
	},
})
export class SortableListItemComponent {
	label = input.required<string>();
	helperMessage = input<string>();
	clickable = input(false, { transform: booleanAttribute });
	unclearable = input(false, { transform: booleanAttribute });
	drag = input(false, { transform: booleanAttribute });

	delete = output<void>();
}
