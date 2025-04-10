import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableDeprecatedStory {}

export default {
	title: 'Documentation/Listings/Index Table/Deprecated',
} as Meta;

function getTemplate(args: IndexTableDeprecatedStory): string {
	return `
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
				<!-- indexTable-body-row-cell-action is deprecated -->
				<a href="#" class="indexTable-body-row-cell-action">Action</a>
				Content (with deprecated action)
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<IndexTableDeprecatedStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Deprecated = Template.bind({});
