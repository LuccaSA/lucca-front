import { Meta, StoryObj } from '@storybook/angular';

interface IndexTablePaginationStory {}

export default {
	title: 'Documentation/Listings/Index Table/Pagination',
	argTypes: {},
} as Meta;

function getTemplate(args: IndexTablePaginationStory): string {
	return `<div class="indexTableWrapper">
	<table class="indexTable">
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
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
			</tr>
		</tbody>
	</table>
	<nav class="pagination" role="navigation" aria-label="Pagination des résultats">
		<div class="pagination-count">
			<span class="pagination-count-current">
				<span class="pr-u-mask">Résultats de </span>
				1<span aria-hidden="true"> – </span>
				<span class="pr-u-mask">à </span>10
			</span>
			<span class="pagination-count-separator"> sur </span>
			<span class="pagination-count-total">
				50<span class="pr-u-mask"> pages</span>
			</span>
		</div>
		<div class="pagination-scrolling">
			<button type="button" class="button mod-onlyIcon mod-ghost mod-S" disabled>
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronLeft"></span>
				<span class="pr-u-mask">Précédent</span>
			</button>
			<button type="button" class="button mod-onlyIcon mod-ghost mod-S">
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronRight"></span>
				<span class="pr-u-mask">Suivant</span>
			</button>
		</div>
	</nav>
</div>`;
}

const Template = (args: IndexTablePaginationStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Pagination: StoryObj<IndexTablePaginationStory> = {
	args: {},
	render: Template,
};
