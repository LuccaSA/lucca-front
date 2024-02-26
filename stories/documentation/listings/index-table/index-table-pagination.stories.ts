import { Meta, StoryFn } from '@storybook/angular';

interface IndexTablePaginationStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Pagination',
	argTypes: {
		
	},
} as Meta;

function getTemplate(args: IndexTablePaginationStory): string {
	return `
	<table class="indexTable mod-withPagination">
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
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
		</tbody>
	</table>
	<nav class="pagination" role="navigation" aria-labelledby="pagination-count">
		<div id="pagination-count" class="pagination-count">
			<span class="pagination-count-current">
				<span class="u-mask">Résultats de </span>
				1<span aria-hidden="true"> – </span>
				<span class="u-mask">à </span>10
			</span>
			<span class="pagination-count-separator"> de </span>
			<span class="pagination-count-total">
				50<span class="u-mask"> pages</span>
			</span>
		</div>
		<div class="pagination-scrolling">
			<button type="button" class="button mod-onlyIcon mod-text mod-S" disabled>
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronLeft"></span>
				<span class="u-mask">Précédent</span>
			</button>
			<button type="button" class="button mod-onlyIcon mod-text mod-S">
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronRight"></span>
				<span class="u-mask">Suivant</span>
			</button>
		</div>
	</nav>
	`;
}

const Template: StoryFn<IndexTablePaginationStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Pagination = Template.bind({});
Pagination.args = { };
