import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableResponsiveCardListCustomStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Responsive Card List Custom',
	argTypes: {

	},
} as Meta;

function getTemplate(args: IndexTableResponsiveCardListCustomStory): string {
	return `<style>
	/** .mytable is an example of a custom user css grid template */
	.myTable {
		--components-indexTable-row-responsive-grid-template-columns: 1fr 1fr;
		--components-indexTable-row-responsive-grid-template-areas: 'title total' 'text text';
	}
	.myTable  .indexTable-body-row-cell:first-child {
		grid-area: title;
	}
	.myTable  .indexTable-body-row-cell:nth-child(2) {
		grid-area: text;
	}
	.myTable  .indexTable-body-row-cell:nth-child(3) {
		grid-area: total;
		text-align: right;
	}
</style>
<table class="indexTable mod-responsiveCardList myTable u-marginBottomL" >
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Lorem</th>
			<th class="indexTable-head-row-cell" scope="col">Ipsum</th>
			<th class="indexTable-head-row-cell" scope="col">Dolorem</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Lorem ipsum dolor
			</td>
			<td class="indexTable-body-row-cell">Aliquam vestibulum pulvinar luctus</td>
			<td class="indexTable-body-row-cell"><strong>122,00 €</strong></td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Vivamus a accumsan
			</td>
			<td class="indexTable-body-row-cell">Phasellus ullamcorper vehicula diam in dignissim. Mauris cursus volutpat leo eu convallis. Sed sed scelerisque libero</td>
			<td class="indexTable-body-row-cell"><strong>56,50 €</strong></td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<IndexTableResponsiveCardListCustomStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const ResponsiveCardListCustom = Template.bind({});
ResponsiveCardListCustom.args = { };
