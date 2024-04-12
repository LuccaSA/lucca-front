import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableLayoutFixedResponsiveStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Layout Fixed',
	argTypes: {

	},
} as Meta;

function getTemplate(args: IndexTableLayoutFixedResponsiveStory): string {
	return `<table class="indexTable mod-layoutFixedAtMediaMinS u-marginBottomL">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
		<th class="indexTable-head-row-cell" scope="col" style="--components-indexTable-cell-fixed-width: 15;">15rem column</th>
		<th class="indexTable-head-row-cell" scope="col" style="--components-indexTable-cell-fixed-width: 10;">10rem column</th>
		<th class="indexTable-head-row-cell" scope="col" style="--components-indexTable-cell-fixed-width: 6;">6rem col</th>
		<th class="indexTable-head-row-cell" scope="col">Auto width column</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content content</td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<IndexTableLayoutFixedResponsiveStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const LayoutFixedResponsive = Template.bind({});
LayoutFixedResponsive.args = { };
