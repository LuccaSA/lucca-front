import { LOCALE_ID } from '@angular/core';
import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ReorderDirective, ReorderEvent, ReorderItemLabelDirective } from '@lucca-front/ng/reorder';
import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface SortableListDraggableStory {
	label: string;
	helperMessage: string;
	small: boolean;
	clickable: boolean;
	unclearable: boolean;
	// Action Storybook injectée à la place de l'événement de déplacement documenté dans `argTypes`.
	luReorder?: (event: ReorderEvent) => void;
}

export default {
	title: 'Documentation/Listings/Sortable List/Angular/Draggable',
	decorators: [
		moduleMetadata({
			imports: [SortableListComponent, SortableListItemComponent, CdkDropList, CdkDrag, ReorderDirective, ReorderItemLabelDirective],
		}),
		applicationConfig({ providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }] }),
	],
	argTypes: {
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le texte principal d’un élément de liste. [PortalContent]',
			table: { category: 'inputs' },
		},
		helperMessage: {
			control: {
				type: 'text',
			},
			description: 'Ajoute un texte secondaire à l’élément de liste.',
			table: { category: 'inputs' },
		},
		small: {
			control: 'boolean',
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs' },
		},
		clickable: {
			control: 'boolean',
			description: 'Rend les lignes cliquables.',
			table: { category: 'inputs' },
		},
		unclearable: {
			control: 'boolean',
			description: 'Masque la croix de suppression.',
			table: { category: 'inputs' },
		},
		luReorder: {
			description: 'Événement déclenché lorsqu’un élément est déplacé, à la souris, depuis le menu de sa poignée ou au clavier.',
			action: 'luReorder',
			control: false,
			table: { category: 'outputs', type: { summary: 'ReorderEvent' } },
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
				onReorder: (event: ReorderEvent) => {
					moveItemInArray(listItem, event.previousIndex, event.currentIndex);
					args.luReorder?.(event);
				},
			},
			template: `<lu-sortable-list cdkDropList luReorder (luReorder)="onReorder($event)">
	@for (item of listItem; track item.id) {
		<lu-sortable-list-item label="${args.label} {{ item.id }}" helperMessage="${args.helperMessage}"${unclearable}${clickable}${small} drag cdkDrag luReorderItemLabel="${args.label} {{ item.id }}" />
	}
</lu-sortable-list>`,
		};
	},
} as Meta;

export const Basic: StoryObj<SortableListDraggableStory> = {
	name: 'Reorder',
	args: {
		label: 'Label',
		helperMessage: 'Helper message',
		small: false,
		clickable: false,
		unclearable: false,
	},
};
