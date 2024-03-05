import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableMassSelectionAndPaginationStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Mass Selection And Pagination',
	argTypes: {
		
	},
} as Meta;

function getTemplate(args: IndexTableMassSelectionAndPaginationStory): string {
	return `
	<div class="indexTableWrapper">
		<table class="indexTable mod-selectable">
			<thead class="indexTable-head">
				<tr class="indexTable-head-row">
					<th class="indexTable-head-row-transparentCell">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" checked/>
						<span class="checkbox-label"></span>
						<span class="u-mask">Select all</span>
					</label>		
					</th>
					<th class="indexTable-head-row-cell">Label</th>
					<th class="indexTable-head-row-cell">Label</th>
					<th class="indexTable-head-row-cell">Label</th>
				</tr>
			</thead>
			<tbody class="indexTable-body">
				<tr class="indexTable-body-row">
					<td class="indexTable-body-row-transparentCell">
						<label class="checkbox">
							<input class="checkbox-input" type="checkbox" checked />
							<span class="checkbox-label"></span>
							<span class="u-mask">Select this line</span>
						</label>
					</td>
					<td class="indexTable-body-row-cell">Content</td>
					<td class="indexTable-body-row-cell">Content</td>
					<td class="indexTable-body-row-cell">Content</td>
				</tr>
				<tr class="indexTable-body-row">
					<td class="indexTable-body-row-transparentCell">
						<label class="checkbox">
							<input class="checkbox-input" type="checkbox" checked />
							<span class="checkbox-label"></span>
							<span class="u-mask">Select this line</span>
						</label>
					</td>
					<td class="indexTable-body-row-cell">Content</td>
					<td class="indexTable-body-row-cell">Content</td>
					<td class="indexTable-body-row-cell">Content</td>
				</tr>
				<tr class="indexTable-body-row">
					<td class="indexTable-body-row-transparentCell">
						<label class="checkbox">
							<input class="checkbox-input" type="checkbox" checked />
							<span class="checkbox-label"></span>
							<span class="u-mask">Select this line</span>
						</label>
					</td>
					<td class="indexTable-body-row-cell">Content</td>
					<td class="indexTable-body-row-cell">Content</td>
					<td class="indexTable-body-row-cell">Content</td>
				</tr>
			</tbody>
		</table>
		<div class="indexTable_massSelection">
			<span class="indexTable_massSelection-text">3 selected items</span>
			<button class="button mod-text palette-product" type="button">Select all items</button>
		</div>
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
	</div>
	`;
}

const Template: StoryFn<IndexTableMassSelectionAndPaginationStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Pagination = Template.bind({});
Pagination.args = { };
