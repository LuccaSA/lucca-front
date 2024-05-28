import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableActionsStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Actions',
	argTypes: {

	},
} as Meta;

function getTemplate(args: IndexTableActionsStory): string {
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
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell mod-actions">
				<button type="button" class="button indexTable-body-row-cell-subAction">
					<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
				</button>
				<button type="button" class="button indexTable-body-row-cell-subAction">
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
				</button>
			</td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<IndexTableActionsStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Actions = Template.bind({});
Actions.args = { };
