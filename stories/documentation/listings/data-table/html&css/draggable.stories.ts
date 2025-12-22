import { Meta, StoryObj } from '@storybook/angular';

interface DraggableStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Draggable',
	argTypes: {},
} as Meta;

function getTemplate(args: DraggableStory): string {
	return `<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell mod-draggable" aria-hidden="true"></th>
				<th class="dataTable-head-row-cell">Sortable column</th>
				<th class="dataTable-head-row-cell">Sortable column</th>
				<th class="dataTable-head-row-cell">Sortable column</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row mod-draggable cdk-drag-placeholder">
				<td class="dataTable-body-row-cell" aria-hidden="true">
					<span class="button dataTable-body-row-cell-drag">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
					</span>
				</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
			<tr class="dataTable-body-row mod-draggable">
				<td class="dataTable-body-row-cell" aria-hidden="true">
					<span class="button dataTable-body-row-cell-drag">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
					</span>
				</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
			<tr class="dataTable-body-row mod-draggable">
				<td class="dataTable-body-row-cell" aria-hidden="true">
					<span class="button dataTable-body-row-cell-drag">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
					</span>
				</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
		</tbody>
	</table>
</div>

<tr class="dataTable-body-row mod-draggable cdk-drag-preview" aria-hidden="true" style="inline-size: 937px; block-size: 44px">
	<td class="dataTable-body-row-cell" aria-hidden="true">
		<span class="button dataTable-body-row-cell-drag">
			<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span>
		</span>
	</td>
	<td class="dataTable-body-row-cell">Table cell</td>
	<td class="dataTable-body-row-cell">Table cell</td>
	<td class="dataTable-body-row-cell">Table cell</td>
</tr>`;
}

const Template = (args: DraggableStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`:host > .dataTable-body-row { margin-block-start: var(--pr-t-spacings-200) }`],
});

export const Draggable: StoryObj<DraggableStory> = {
	args: {},
	render: Template,
};
