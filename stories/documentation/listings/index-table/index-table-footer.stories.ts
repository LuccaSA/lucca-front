import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableFooterStory {}

export default {
	title: 'Documentation/Listings/Index Table/Footer',
	argTypes: {},
} as Meta;

function getTemplate(args: IndexTableFooterStory): string {
	return `
	<table class="indexTable rwd-autoContainer">
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
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell u-textRight">100,00 €</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
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
	<table class="indexTable rwd-autoContainer">
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
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
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
					<a href="#" class="indexTable-body-row-cell-link">Content</a>
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
	styles: [
		`.indexTable:not(:last-child) {
			margin-bottom: var(--pr-t-spacings-100);
		}`,
	],
});

export const Footer = Template.bind({});
Footer.args = {};
