import { Meta, StoryObj } from '@storybook/angular';

interface IndexTableBasicStory {}

export default {
	title: 'Documentation/Listings/Index Table/HTML & CSS/Basic',
} as Meta;

function getTemplate(args: IndexTableBasicStory): string {
	return `<table class="indexTable">
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
				<a href="#" class="indexTable-body-row-cell-link">Content <code class="code">a</code></a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content <code class="code">a</code></a>
			</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<button type="button" class="indexTable-body-row-cell-link">Content <code class="code">button</code></button>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>`;
}

const Template = (args: IndexTableBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<IndexTableBasicStory> = {
	args: {},
	render: Template,
};
