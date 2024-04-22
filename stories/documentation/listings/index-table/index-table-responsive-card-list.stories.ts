import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableResponsiveCardListStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Responsive Card List',
	argTypes: {

	},
} as Meta;

function getTemplate(args: IndexTableResponsiveCardListStory): string {
	return `<table class="indexTable mod-responsiveCardList">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label 1</th>
			<th class="indexTable-head-row-cell" scope="col">Label 2</th>
			<th class="indexTable-head-row-cell" scope="col">Label 3</th>
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
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<IndexTableResponsiveCardListStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const ResponsiveCardList = Template.bind({});
ResponsiveCardList.args = { };
