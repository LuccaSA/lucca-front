import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableNestedSubTotalsStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Nested Sub Totals',
	argTypes: {

	},
} as Meta;

function getTemplate(args: IndexTableNestedSubTotalsStory): string {
	return `<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell u-textRight" scope="col">Value</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row" id="r0">
			<th class="indexTable-body-row-transparentCell" colspan="2" id="y2021">
				<div class="indexTable-body-row-cellTitle">
					<button class="indexTable-body-row-cellTitle-button button" aria-expanded="true" aria-controls="r1 r2 r3 r4" type="button">
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">2021</span>
					<span class="numericBadge">3</span>
				</div>
			</th>
			<th class="indexTable-body-row-transparentCell u-textRight">
				<div class="indexTable-body-row-subTotal">
					<span class="u-textS">Sub total : </span>
					<strong>7999.10 €</strong>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r1">
			<td class="indexTable-body-row-cell" header="y2021">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell" header="y2021">Content</td>
			<td class="indexTable-body-row-cell u-textRight" header="y2021">
				<strong>170.00 €</strong>
			</td>
		</tr>
		<tr class="indexTable-body-row" id="r2">
			<td class="indexTable-body-row-cell" header="y2021">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell" header="y2021">Content</td>
			<td class="indexTable-body-row-cell u-textRight" header="y2021">
				<strong>50.30 €</strong>
			</td>
		</tr>
		<tr class="indexTable-body-row" id="r3">
			<td class="indexTable-body-row-cell" header="y2021">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell" header="y2021">Content</td>
			<td class="indexTable-body-row-cell u-textRight" header="y2021">
				<strong>7778.80 €</strong>
			</td>
		</tr>
		<tr class="indexTable-foot-row" id="r4">
			<td class="indexTable-foot-row-cell" header="y2021" colspan="3">
				<span class="u-textS">Sub total : </span>
				<strong>7999.10 €</strong>
			</td>
		</tr>
	</tbody>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row" id="r5">
			<th class="indexTable-body-row-transparentCell" colspan="2" id="y2022">
				<div class="indexTable-body-row-cellTitle">
					<button class="indexTable-body-row-cellTitle-button button" aria-expanded="true" aria-controls="r6 r7" type="button">
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">2022</span>
					<span class="numericBadge">1</span>
				</div>
			</th>
			<th class="indexTable-body-row-transparentCell u-textRight">
				<div class="indexTable-body-row-subTotal">
					<span class="u-textS">Sub total : </span>
					<strong>200.00 €</strong>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r6">
			<td class="indexTable-body-row-cell" header="y2022">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell" header="y2022">Content</td>
			<td class="indexTable-body-row-cell u-textRight" header="y2022">
				<strong>200.00 €</strong>
			</td>
		</tr>
		<tr class="indexTable-foot-row" id="r7">
			<td class="indexTable-foot-row-cell" header="y2022" colspan="3">
				<span class="u-textS">Sub total : </span>
				<strong>200.00 €</strong>
			</td>
		</tr>
	</tbody>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row" id="r8">
			<th class="indexTable-body-row-transparentCell" colspan="2" id="y2023">
				<div class="indexTable-body-row-cellTitle">
					<button class="indexTable-body-row-cellTitle-button button" aria-expanded="false" aria-controls="r9 r10" type="button">
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">2023</span>
					<span class="numericBadge">1</span>
				</div>
			</th>
			<th class="indexTable-body-row-transparentCell u-textRight">
				<div class="indexTable-body-row-subTotal">
					<span class="u-textS">Sub total : </span>
					<strong>212.25 €</strong>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row is-closed" id="r9">
			<td class="indexTable-body-row-cell" header="y2023">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell" header="y2023">Content</td>
			<td class="indexTable-body-row-cell u-textRight" header="y2023">
				<strong>212.25 €</strong>
			</td>
		</tr>
		<tr class="indexTable-foot-row is-closed" id="r10">
			<td class="indexTable-foot-row-cell" header="y2023" colspan="3">
				<span class="u-textS">Sub total : </span>
				<strong>212.25 €</strong>
			</td>
		</tr>
	</tbody>
	<tfoot class="indexTable-foot">
		<tr class="indexTable-foot-row">
			<td class="indexTable-foot-row-cell" colspan="3">
				<span class="u-textS">Total: </span>
				<strong>8411.35 €</strong>
			</td>
		</tr>
	</tfoot>
</table>`;
}

const Template: StoryFn<IndexTableNestedSubTotalsStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const NestedSubTotals = Template.bind({});
NestedSubTotals.args = { };
