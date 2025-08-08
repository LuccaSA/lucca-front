import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableActionsSubActionStory {}

export default {
	title: 'Documentation/Listings/Index Table/Actions/SubAction',
} as Meta;

function getTemplate(args: IndexTableActionsSubActionStory): string {
	return `<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">
				<span class="u-mask">Actions</span>
			</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell mod-actions">
				<button type="button" class="button indexTable-body-row-cell-subAction">
					<span aria-hidden="true" class="lucca-icon icon-copy"></span>
					<span class="u-mask">Copy</span>
				</button>
				<button type="button" class="button indexTable-body-row-cell-subAction">
					<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					<span class="u-mask">Edit</span>
				</button>
				<button type="button" class="button mod-delete indexTable-body-row-cell-subAction">
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					<span class="u-mask">Delete</span>
				</button>
			</td>
		</tr>
	</tbody>
</table>
`;
}

const Template: StoryFn<IndexTableActionsSubActionStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const SubActions = Template.bind({});
