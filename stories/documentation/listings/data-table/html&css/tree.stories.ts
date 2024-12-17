import { Meta, StoryFn } from '@storybook/angular';

interface TreeStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Tree',
	argTypes: {},
} as Meta;

function getTemplate(args: TreeStory): string {
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
				<td class="dataTable-body-row-cell mod-tree">
					<button type="button" class="button dataTable-body-row-cell-expand" aria-expanded="true">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronTop"></span
						><span class="u-mask">Afficher 2 lignes supplémentaire</span>
					</button>
					Text
				</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-tree" [attr.style]="'--components-dataTable-treeLevel: 2'">
					<button type="button" class="button dataTable-body-row-cell-expand" aria-expanded="true">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronTop"></span
						><span class="u-mask">Afficher 2 lignes supplémentaire</span>
					</button>
					Text
				</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-tree" [attr.style]="'--components-dataTable-treeLevel: 3'">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-tree">
					<button type="button" class="button dataTable-body-row-cell-expand" aria-expanded="false">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronTop"></span
						><span class="u-mask">Afficher 2 lignes supplémentaire</span>
					</button>
					Text
				</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
	</table>
</div>`;
}

const Template: StoryFn<TreeStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Tree = Template.bind({});
Tree.args = {};
