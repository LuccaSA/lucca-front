import { Meta, StoryFn } from '@storybook/angular';

interface TableFiltersStory {
	palette: string;
}

export default {
	title: 'Documentation/Listings/Table/Filters',
	argTypes: {},
} as Meta;

function getTemplate(args: TableFiltersStory): string {
	return `
	<table class="table">
		<thead class="table-head">
			<tr class="table-head-row">
				<th class="table-head-row-cell">Label</th>
				<th class="table-head-row-cell">Label</th>
				<th class="table-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="table-body">
			<tr class="table-body-row mod-filters">
				<td class="table-body-row-cell">
					<div class="textfield mod-search mod-block">
						<input class="textfield-input" type="text" placeholder="Rechercher">
					</div>
				</td>
				<td class="table-body-row-cell">
					<div class="textfield mod-search mod-block">
						<input class="textfield-input" type="text" placeholder="Rechercher">
					</div>
				</td>
				<td class="table-body-row-cell">
					<div class="textfield mod-search mod-block">
						<input class="textfield-input" type="text" placeholder="Rechercher">
					</div>
				</td>
			</tr>
			<tr class="table-body-row">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
			</tr>
		</tbody>
	</table>
	`;
}

const Template: StoryFn<TableFiltersStory> = (args: TableFiltersStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Filters = Template.bind({});
Filters.args = {};
