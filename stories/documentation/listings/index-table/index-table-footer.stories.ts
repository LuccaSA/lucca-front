import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableFooterStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Footer',
	argTypes: {
		
	},
} as Meta;

function getTemplate(args: IndexTableFooterStory): string {
	return `
	<h2 class="u-h3">Single footer</h2>
	<table class="indexTable u-marginBottomL">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell u-textRight" scope="col">Amount</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell u-textRight">100,00 €</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell u-textRight">50,00 €</td>
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
	<h2 class="u-h3">Multiples footers</h2>
	<table class="indexTable">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell u-textRight" scope="col">Amount</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell u-textRight">170,00 €</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell u-textRight">7778,80 €</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell u-textRight">126,00 €</td>
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
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell u-textRight">133,00 €</td>
			</tr>
			<tr class="indexTable-foot-row">
				<td class="indexTable-foot-row-cell" colspan="3">
					Total: <strong>133,00 €</strong>
				</td>
			</tr>
		</tbody>
	</table>
	`;
}

const Template: StoryFn<IndexTableFooterStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Footer = Template.bind({});
Footer.args = { };
