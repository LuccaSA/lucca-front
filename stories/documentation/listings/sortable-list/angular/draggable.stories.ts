import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface SortableListDraggableStories {
	label: string;
	helperMessage: string;
	small: boolean;
	clickable: boolean;
	clearable: boolean;
	draggable: boolean;
}

export default {
	title: 'Documentation/Listings/Sortable List/Angular/Draggable',
	argsTyps: {
		label: {
			control: {
				type: 'text',
			},
		},
		helperMessage: {
			control: {
				type: 'text',
			},
		},
		small: {
			control: {
				type: 'boolean',
			},
		},
		clickable: {
			control: {
				type: 'boolean',
			},
		},
		clearable: {
			control: {
				type: 'boolean',
			},
		},
		draggable: {
			control: {
				type: 'boolean',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [SortableListComponent, SortableListItemComponent, CdkDropList, CdkDrag],
		}),
	],
	render: (args: SortableListDraggableStories) => {
		const small = args.small ? ` small="true"` : '';
		const clickable = args.clickable ? ` clickable` : '';
		const clearable = args.clearable ? '' : ` clearable="false"`;
		const draggable = args.draggable ? ` drag="true"` : '';
		const label = ` label="${args.label}"`;
		const helperMessage = args.helperMessage?.length ? ` helperMessage="${args.helperMessage}"` : '';
		return {
			template: cleanupTemplate(`<lu-sortable-list${small} cdkDropList>
	<lu-sortable-list-item${label}${helperMessage}${clearable}${clickable}${draggable}/>
	<lu-sortable-list-item${label}${helperMessage}${clearable}${clickable}${draggable}/>
	<lu-sortable-list-item${label}${helperMessage}${clearable}${clickable}${draggable}/>
</lu-sortable-list>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		label: 'Label',
		helperMessage: 'Helper message',
		small: false,
		clickable: false,
		clearable: true,
		draggable: true,
	},
};
