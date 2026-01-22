import { Meta, StoryObj } from '@storybook/angular';

interface BasicStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Pagination',
	argTypes: {},
} as Meta;

function getTemplate(args: BasicStory): string {
	const paginationTpl = `
	<nav class="pagination dataTableWrapper-pagination" role="navigation" aria-label="Pagination des résultats">
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
	</nav>`;
	return `<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
		<tfoot class="dataTable-foot">
			<tr class="dataTable-foot-row">
				<td class="dataTable-foot-row-cell">Text</td>
				<td class="dataTable-foot-row-cell">Text</td>
				<td class="dataTable-foot-row-cell">Text</td>
			</tr>
		</tfoot>
	</table>${paginationTpl}
</div>`;
}

const Template = (args: BasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BasicStory> = {
	args: {},
	render: Template,
};
