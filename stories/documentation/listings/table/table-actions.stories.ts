import { Meta, StoryFn } from '@storybook/angular';

interface TableActionsStory {}

export default {
	title: 'Documentation/Listings/Table/Actions',
	argTypes: {},
} as Meta;

function getTemplate(args: TableActionsStory): string {
	return `
	<table class="table">
	<thead class="table-head">
		<tr class="table-head-row">
			<th class="table-head-row-cell">Label</th>
			<th class="table-head-row-cell">Label</th>
			<th class="table-head-row-cell">Label</th>
			<th class="table-head-row-cell mod-actions"></th>
		</tr>
	</thead>
	<tbody class="table-body">
		<tr class="table-body-row">
			<td class="table-body-row-cell">Contenu</td>
			<td class="table-body-row-cell">Contenu</td>
			<td class="table-body-row-cell">Contenu</td>
			<td class="table-body-row-cell mod-actions">
				<button type="button" class="actionIcon mod-S">
					<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
				</button>
				<button type="button" class="actionIcon mod-S">
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
				</button>
			</td>
		</tr>
		<tr class="table-body-row">
			<td class="table-body-row-cell">Contenu</td>
			<td class="table-body-row-cell">Contenu</td>
			<td class="table-body-row-cell">Contenu</td>
			<td class="table-body-row-cell mod-actions">
				<button type="button" class="actionIcon mod-S"><span aria-hidden="true" class="lucca-icon icon-officePen"></span></button>
				<button type="button" class="actionIcon mod-S"><span aria-hidden="true" class="lucca-icon icon-trashDelete"></span></button>
			</td>
		</tr>
		<tr class="table-body-row">
			<td class="table-body-row-cell">Contenu</td>
			<td class="table-body-row-cell">Contenu</td>
			<td class="table-body-row-cell">Contenu</td>
			<td class="table-body-row-cell mod-actions">
				<button type="button" class="actionIcon mod-S"><span aria-hidden="true" class="lucca-icon icon-officePen"></span></button>
				<button type="button" class="actionIcon mod-S"><span aria-hidden="true" class="lucca-icon icon-trashDelete"></span></button>
			</td>
		</tr>
	</tbody>
</table>
	`;
}

const Template: StoryFn<TableActionsStory> = (args: TableActionsStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Actions = Template.bind({});
Actions.args = {};
