import { Meta, StoryObj } from '@storybook/angular';

interface IndexTableMassSelectionAndPaginationStory {}

export default {
	title: 'Documentation/Listings/Index Table/HTML & CSS/Mass Selection And Pagination',
	argTypes: {},
} as Meta;

function getTemplate(args: IndexTableMassSelectionAndPaginationStory): string {
	return `<div class="indexTableWrapper">
	<table class="indexTable mod-selectable">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-transparentCell" scope="col">
					<label class="formLabel pr-u-mask" for="allchbx">Select all items</label>
					<span class="checkboxField indexTable-head-row-cell-checkbox">
						<input class="checkboxField-input" checked type="checkbox" id="allchbx"
							aria-controls="r0chbx r1chbx r2chbx" />
						<span class="checkboxField-icon" aria-hidden="true"><span
								class="checkboxField-icon-check"></span></span>
					</span>
				</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
			</tr>
			<tr class="indexTable-head-row mod-massSelection">
				<th class="indexTable-head-row-cell" colspan="4">
					<div class="indexTable-head-row-cell-massSelection">
						<span>3 selected items</span>
						<button class="button palette-product" type="button">Select all items</button>
					</div>
				</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-transparentCell">
					<label class="formLabel pr-u-mask" for="r0chbx">Select this item</label>
					<span class="checkboxField indexTable-body-row-cell-checkbox">
						<input class="checkboxField-input" checked type="checkbox" id="r0chbx" />
						<span class="checkboxField-icon" aria-hidden="true"><span
								class="checkboxField-icon-check"></span></span>
					</span>
				</td>
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-transparentCell">
					<label class="formLabel pr-u-mask" for="r1chbx">Select this item</label>
					<span class="checkboxField indexTable-body-row-cell-checkbox">
						<input class="checkboxField-input" checked type="checkbox" id="r1chbx" />
						<span class="checkboxField-icon" aria-hidden="true"><span
								class="checkboxField-icon-check"></span></span>
					</span>
				</td>
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
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

const Template = (args: IndexTableMassSelectionAndPaginationStory) => ({
	props: args,
	template: getTemplate(args),
});

export const MassSelectionAndPagination: StoryObj<IndexTableMassSelectionAndPaginationStory> = {
	args: {},
	render: Template,
};
