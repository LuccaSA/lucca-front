import { Meta, StoryFn } from '@storybook/angular';

interface DraggableStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Draggable',
	argTypes: {},
} as Meta;

function getTemplate(args: DraggableStory): string {
	return `<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row mod-draggable">
				<th class="dataTable-head-row-cell"></th>
				<th class="dataTable-head-row-cell">Sortable column</th>
				<th class="dataTable-head-row-cell">Sortable column</th>
				<th class="dataTable-head-row-cell">Sortable column</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row mod-draggable">
				<td class="dataTable-body-row-cell mod-draggable">
					<button type="button" class="button dataTable-body-row-cell-drag">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span><span class="pr-u-mask">Déplacer</span>
					</button>
				</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
			<tr class="dataTable-body-row mod-draggable">
				<td class="dataTable-body-row-cell mod-draggable">
					<button type="button" class="button dataTable-body-row-cell-drag">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span><span class="pr-u-mask">Déplacer</span>
					</button>
				</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
			<tr class="dataTable-body-row mod-draggable">
				<td class="dataTable-body-row-cell mod-draggable">
					<button type="button" class="button dataTable-body-row-cell-drag">
						<span aria-hidden="true" class="lucca-icon icon-dotsDrag"></span><span class="pr-u-mask">Déplacer</span>
					</button>
				</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
		</tbody>
	</table>
</div>`;
}

const Template: StoryFn<DraggableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Draggable = Template.bind({});
Draggable.args = {};
