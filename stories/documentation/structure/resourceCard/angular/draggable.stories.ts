import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, input } from '@angular/core';
import { ResourceCardComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'resource-card-draggable-stories',
	imports: [ResourceCardComponent, ResourceCardWrapperComponent, CdkDropList, CdkDrag],
	templateUrl: 'draggable.stories.html',
})
class ResourceCardDraggableStory {
	wrapperGrid = input<boolean>(false);

	listItem: Array<{ id: number; header: string; text: string }> = [
		{ id: 1, header: 'Header 1', text: '' },
		{ id: 2, header: 'Header 2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
		{ id: 3, header: 'Header 3', text: 'Excepteur sint occaecat cupidatat non proident' },
		{
			id: 4,
			header: 'Header 4',
			text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt',
		},
	];

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.listItem, event.previousIndex, event.currentIndex);
	}
}

export default {
	title: 'Documentation/Structure/Resource Card/Angular/Draggable',
	component: ResourceCardDraggableStory,
	wrapperGrid: {
		selectable: {
			control: 'boolean',
		},
	},
} as Meta;

const template: StoryFn<ResourceCardDraggableStory> = (args) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {
	wrapperGrid: false,
};

const code = `
<lu-resource-card-wrapper draggable cdkDropList (cdkDropListDropped)="drop($event)">
	<lu-resource-card cdkDrag>
		<a href="#" luResourceCardAction>Header 1</a>
		<ng-container resourceCardDescription>Lorem ipsum dolor</ng-container>
	</lu-resource-card>
	<lu-resource-card cdkDrag>
		<a href="#" luResourceCardAction>Header 2</a>
	</lu-resource-card>
</lu-resource-card-wrapper>
`;

Basic.parameters = {
	docs: {
		source: {
			language: 'html',
			type: 'code',
			code,
		},
	},
};
