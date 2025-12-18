import { Meta, StoryObj } from '@storybook/angular';

interface IndexTableStickyHeaderStory {}

export default {
	title: 'Documentation/Listings/Index Table/Sticky Header',
	argTypes: {},
} as Meta;

function getTemplate(args: IndexTableStickyHeaderStory): string {
	return `<div class="demo-wrapper">
	<table class="indexTable mod-stickyHeader">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
		</tbody>
	</table>
</div>`;
}

const Template = (args: IndexTableStickyHeaderStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`.demo-wrapper {overflow: auto; height: 10rem;}`],
});

export const StickyHeader: StoryObj<IndexTableStickyHeaderStory> = {
	args: {},
	render: Template,
};
