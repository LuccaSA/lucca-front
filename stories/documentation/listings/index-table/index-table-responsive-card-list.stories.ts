import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableResponsiveCardListStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Responsive Card List',
	argTypes: {
		
	},
} as Meta;

function getTemplate(args: IndexTableResponsiveCardListStory): string {
	return `
	<div style="resize: horizontal; overflow: auto">
		<h2 class="u-h3">Basic</h2>
		<table class="indexTable mod-responsiveCardList u-marginBottomL">
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
				<tr class="indexTable-body-row">
					<td class="indexTable-body-row-cell">
						<a href="#" class="indexTable-body-row-cell-action">See details</a>
						Content
					</td>
					<td class="indexTable-body-row-cell">Content</td>
					<td class="indexTable-body-row-cell">Content</td>
				</tr>
			</tbody>
		</table>
		<h2 class="u-h3">With data-name</h2>
		<table class="indexTable mod-responsiveCardList u-marginBottomL">
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
						<div class="indexTable-body-row-cell-content" data-name="Label 1">
							<a href="#" class="indexTable-body-row-cell-action">See details</a>
							Content
						</div>
					</td>
					<td class="indexTable-body-row-cell">
						<div class="indexTable-body-row-cell-content" data-name="Label 2">
							Content
						</div>
					</td>
					<td class="indexTable-body-row-cell">
						<div class="indexTable-body-row-cell-content" data-name="Label 3">
							Content
						</div>
					</td>
				</tr>
				<tr class="indexTable-body-row">
					<td class="indexTable-body-row-cell">
						<div class="indexTable-body-row-cell-content" data-name="Label 1">
							<a href="#" class="indexTable-body-row-cell-action">See details</a>
							Content
						</div>
					</td>
					<td class="indexTable-body-row-cell">
						<div class="indexTable-body-row-cell-content" data-name="Label 2">
							Content
						</div>
					</td>
					<td class="indexTable-body-row-cell">
						<div class="indexTable-body-row-cell-content" data-name="Label 3">
							Content
						</div>
					</td>
				</tr>
				<tr class="indexTable-body-row">
					<td class="indexTable-body-row-cell">
						<div class="indexTable-body-row-cell-content" data-name="Label 1">
							<a href="#" class="indexTable-body-row-cell-action">See details</a>
							Content
						</div>
					</td>
					<td class="indexTable-body-row-cell">
						<div class="indexTable-body-row-cell-content" data-name="Label 2">
							Content
						</div>
					</td>
					<td class="indexTable-body-row-cell">
						<div class="indexTable-body-row-cell-content" data-name="Label 3">
							Content
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<h2 class="u-h3">User defined custom grid template</h2>
		<style>
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
				<tr class="indexTable-body-row">
					<td class="indexTable-body-row-cell">
						<a href="#" class="indexTable-body-row-cell-action">See details</a>
						Phasellus ut orci
					</td>
					<td class="indexTable-body-row-cell">Quisque a tellus at dui elementum</td>
					<td class="indexTable-body-row-cell"><strong>45,17 €</strong></td>
				</tr>
			</tbody>
		</table>
	</div>
	`;
}

const Template: StoryFn<IndexTableResponsiveCardListStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const ResponsiveCardList = Template.bind({});
ResponsiveCardList.args = { };
