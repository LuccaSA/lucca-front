import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface SortableListDraggableStory {
	label: string;
	helperMessage: string;
	small: boolean;
	clickable: boolean;
	unclearable: boolean;
}

export default {
	title: 'Documentation/Listings/Sortable List/Angular/Draggable',
	decorators: [
		moduleMetadata({
			imports: [SortableListComponent, SortableListItemComponent, CdkDropList, CdkDrag],
		}),
	],
	argTypes: {
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le texte principal d’un élément de liste. [PortalContent]',
		},
		helperMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte secondaire à l’élément de liste.',
		},
		small: {
			control: 'boolean',
			description: 'Modifie la taille du composant.',
		},
		clickable: {
			control: 'boolean',
			description: 'Rend les lignes cliquables.',
		},
		unclearable: {
			control: 'boolean',
			description: 'Masque la croix de suppression.',
		},
		drop: {
			description: 'Événement déclenché au drop.',
		},
	},
	render: (args: SortableListDraggableStory) => {
		const unclearable = args.unclearable ? ' unclearable' : '';
		const clickable = args.clickable ? ' clickable' : '';
		const small = args.small ? ' small' : '';
		const listItem = [{ id: 1 }, { id: 2 }, { id: 3 }];

		return {
			props: {
				listItem,
				drop: (event: CdkDragDrop<unknown[]>) => moveItemInArray(listItem, event.previousIndex, event.currentIndex),
			},
			template: `<lu-sortable-list cdkDropList (cdkDropListDropped)="drop($event)">
	<lu-sortable-list-item label="${args.label}" helperMessage="${args.helperMessage}"${unclearable}${clickable}${small} drag cdkDrag />
	<lu-sortable-list-item label="${args.label}" helperMessage="${args.helperMessage}"${unclearable}${clickable}${small} drag cdkDrag />
	<lu-sortable-list-item label="${args.label}" helperMessage="${args.helperMessage}"${unclearable}${clickable}${small} drag cdkDrag />
</lu-sortable-list>`,
		};
	},
} as Meta;

export const Basic: StoryObj<SortableListDraggableStory> = {
	args: {
		label: 'Label',
		helperMessage: 'Helper message',
		small: false,
		clickable: false,
		unclearable: false,
	},
};
