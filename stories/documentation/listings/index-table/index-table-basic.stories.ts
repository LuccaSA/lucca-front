import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableBasicStory {}

export default {
	title: 'Documentation/Listings/Index Table/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: IndexTableBasicStory): string {
	return `
	<div class="indexTableWrapper">
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
					<td class="indexTable-body-row-cell">
						<a href="#" class="indexTable-body-row-cell-link">Content</a>
					</td>
					<td class="indexTable-body-row-cell mod-allowTextSelection">
						Content selectable
					</td>
					<td class="indexTable-body-row-cell">
						Content
					</td>
				</tr>
				<tr class="indexTable-body-row">
					<td class="indexTable-body-row-cell">
						<a href="#" class="indexTable-body-row-cell-link">Content</a>
					</td>
					<td class="indexTable-body-row-cell"><a href="#">Content actionable</a></td>
					<td class="indexTable-body-row-cell">Content</td>
				</tr>
			</tbody>
		</table>
	</div>
`;
}

const Template: StoryFn<IndexTableBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
