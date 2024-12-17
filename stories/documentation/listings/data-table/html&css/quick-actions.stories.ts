import { Meta, StoryFn } from '@storybook/angular';

interface QuickActionsStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Quick actions',
	argTypes: {},
} as Meta;

function getTemplate(args: QuickActionsStory): string {
	return `<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell mod-actions">
					<button class="button" type="button">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span><span class="u-mask">Edit</span>
					</button>
					<button class="button" type="button">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span><span class="u-mask">Delete</span>
					</button>
				</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell mod-actions">
					<button type="button" class="button">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span><span class="u-mask">Edit</span>
					</button>
					<button type="button" class="button">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span><span class="u-mask">Delete</span>
					</button>
				</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell mod-actions">
					<button type="button" class="button">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span><span class="u-mask">Edit</span>
					</button>
					<button type="button" class="button">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span><span class="u-mask">Delete</span>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</div>`;
}

const Template: StoryFn<QuickActionsStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const QuickActions = Template.bind({});
QuickActions.args = {};
