import { Meta, StoryObj } from '@storybook/angular';

interface IndexTableFooterStory {}

export default {
	title: 'Documentation/Listings/Index Table/Footer',
	argTypes: {},
} as Meta;

function getTemplate(args: IndexTableFooterStory): string {
	return `<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell mod-alignRight" scope="col">Amount</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight">100,00 €</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight">50,00 €</td>
		</tr>
	</tbody>
	<tfoot class="indexTable-foot">
		<tr class="indexTable-foot-row">
			<td class="indexTable-foot-row-cell" colspan="3">
				Total: <strong>150,00 €</strong>
			</td>
		</tr>
	</tfoot>
</table>
<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell mod-alignRight" scope="col">Amount</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight">126,00 €</td>
		</tr>
		<tr class="indexTable-foot-row">
			<td class="indexTable-foot-row-cell" colspan="3">
				Total: <strong>8074,8 €</strong>
			</td>
		</tr>
	</tbody>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell mod-alignRight">133,00 €</td>
		</tr>
		<tr class="indexTable-foot-row">
			<td class="indexTable-foot-row-cell" colspan="3">
				Total: <strong>133,00 €</strong>
			</td>
		</tr>
	</tbody>
</table>`;
}

const Template = (args: IndexTableFooterStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`.indexTable:not(:last-child) {
			margin-block-end: var(--pr-t-spacings-100);
		}`,
	],
});

export const Footer: StoryObj<IndexTableFooterStory> = {
	args: {},
	render: Template,
};
