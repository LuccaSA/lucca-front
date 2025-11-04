import { booleanAttribute, ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-sortable-list-item',
	standalone: true,
	templateUrl: './sortable-list-item.component.html',
	styleUrl: './sortable-list-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'sortableList-item',
		'[class.mod-clickable]': 'clickable()',
		role: 'listitem',
	},
})
export class SortableListItemComponent {
	label = input.required<string>();
	helperMessage = input<string | null>();
	clickable = input(false, { transform: booleanAttribute });
	clearable = input(true, { transform: booleanAttribute });

	delete = output<void>();
}
