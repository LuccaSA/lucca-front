import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, input } from '@angular/core';
import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';
import { Meta, StoryFn } from '@storybook/angular';

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
		small: {
			control: 'boolean',
		},
		clickable: {
			control: 'boolean',
		},
		unclearable: {
			control: 'boolean',
		},
	},
} as Meta;

const template: StoryFn<SortableListDraggableStory> = (args) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {
	small: false,
	clickable: false,
	unclearable: false,
};

const code = `<lu-sortable-list cdkDropList (cdkDropListDropped)="drop($event)" [small]="small()">
	<lu-sortable-list-item
		[label]="item.label"
		[helperMessage]="item.helperMessage"
		[unclearable]="unclearable()"
		[clickable]="clickable()"
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
