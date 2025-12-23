import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, input } from '@angular/core';
import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';
import { Meta, StoryObj } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';

@Component({
	selector: 'sortable-list-draggable-stories',
	imports: [SortableListComponent, SortableListItemComponent, CdkDropList, CdkDrag],
	templateUrl: './draggable.stories.html',
})
class SortableListDraggableStory {
	small = input<boolean>(false);
	clickable = input<boolean>(false);
	unclearable = input<boolean>(false);

	listItem: Array<{ id: number; label: string; helperMessage: string }> = [
		{ id: 1, label: 'Label 1', helperMessage: 'help 1' },
		{ id: 2, label: 'Label 2', helperMessage: 'help 2' },
		{ id: 3, label: 'Label 3', helperMessage: 'help 3' },
	];

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.listItem, event.previousIndex, event.currentIndex);
	}
}

export default {
	title: 'Documentation/Listings/Sortable List/Angular/Draggable',
	component: SortableListDraggableStory,
	argTypes: {
		label: {
			control: {
				type: 'text',
			},
			description: "Modifie le texte principal d'un élément de liste.",
		},
		helperMessage: {
			control: {
				type: 'text',
			},
			description: "Ajoute un texte secondaire à l'élément de liste.",
		},
		small: {
			control: 'boolean',
			description: 'Modifie la taille du composant.',
		},
		clickable: {
			description: 'Rend les lignes cliquables.',
		},
		unclearable: {
			control: 'boolean',
			description: 'Masque la croix de suppression.',
		},
		drop: {
			description: 'Evénement déclanché au drop.',
		},
		listItem: HiddenArgType,
	},
} as Meta;

export const Basic: StoryObj<SortableListDraggableStory> = {
	args: {
		small: false,
		clickable: false,
		unclearable: false,
	},
};

const code = `<lu-sortable-list cdkDropList (cdkDropListDropped)="drop($event)">
	<lu-sortable-list-item
		label="Label 1"
		helperMessage="help 1"
		[unclearable]="unclearable()"
		[clickable]="clickable()"
		[small]="small()"
		cdkDrag
	/>
	<lu-sortable-list-item
		label="Label 2"
		helperMessage="help 2"
		[unclearable]="unclearable()"
		[clickable]="clickable()"
		[small]="small()"
		cdkDrag
	/>
</lu-sortable-list>`;

Basic.parameters = {
	docs: {
		source: {
			language: 'html',
			type: 'code',
			code,
		},
	},
};
