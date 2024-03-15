import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableNestedStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Nested',
	argTypes: {
		
	},
} as Meta;

function getTemplate(args: IndexTableNestedStory): string {
	return `
	<h2 class="u-h3">Basic</h2>
	<table class="indexTable u-marginBottomL">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row" id="r0">
				<th class="indexTable-body-row-transparentCell" colspan="3" id="y2021">
					<div class="indexTable-body-row-cellTitle">
						<button class="indexTable-body-row-cellTitle-button button mod-text mod-onlyIcon" aria-expanded="true" aria-controls="r1 r2 r3" type="button">
							<span class="lucca-icon icon-arrowChevronBottom" aria-hidden="true"></span>
							<span class="u-mask">Hide details</span>
						</button>
						<span class="indexTable-body-row-cellTitle-title">2021</span>
						<span class="numericBadge">3</span>
					</div>
				</th>
			</tr>
			<tr class="indexTable-body-row" id="r1">
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
			</tr>
			<tr class="indexTable-body-row" id="r2">
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
			</tr>
			<tr class="indexTable-body-row" id="r3">
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
			</tr>
		</tbody>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row" id="r4">
				<th class="indexTable-body-row-transparentCell" colspan="3" id="y2022">
					<div class="indexTable-body-row-cellTitle">
						<button class="indexTable-body-row-cellTitle-button button mod-text mod-onlyIcon" aria-expanded="true" aria-controls="r5" type="button">
							<span class="lucca-icon icon-arrowChevronBottom" aria-hidden="true"></span>
							<span class="u-mask">Hide details</span>
						</button>
						<span class="indexTable-body-row-cellTitle-title">2022</span>
						<span class="numericBadge">1</span>
					</div>
				</th>
			</tr>
			<tr class="indexTable-body-row" id="r5">
				<td class="indexTable-body-row-cell" header="y2022">Content</td>
				<td class="indexTable-body-row-cell" header="y2022">Content</td>
				<td class="indexTable-body-row-cell" header="y2022">Content</td>
			</tr>
		</tbody>
	</table>
	<h2 class="u-h3">Value in header</h2>
	<table class="indexTable">
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
						<button class="indexTable-body-row-cellTitle-button button mod-text mod-onlyIcon" aria-expanded="true" aria-controls="r1 r2 r3" type="button">
							<span class="lucca-icon icon-arrowChevronBottom" aria-hidden="true"></span>
							<span class="u-mask">Hide details</span>
						</button>
						<span class="indexTable-body-row-cellTitle-title">2021</span>
						<span class="numericBadge">3</span>
					</div>
				</th>
				<th class="indexTable-body-row-transparentCell u-textRight">
					<span>Total : </span>
					<strong>7999.1 €</strong>
				</th>
			</tr>
			<tr class="indexTable-body-row" id="r1">
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
				<td class="indexTable-body-row-cell u-textRight" header="y2021">
					<strong>170.00 €</strong>
				</td>
			</tr>
			<tr class="indexTable-body-row" id="r2">
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
				<td class="indexTable-body-row-cell u-textRight" header="y2021">
					<strong>50.30 €</strong>
				</td>
			</tr>
			<tr class="indexTable-body-row" id="r3">
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
				<td class="indexTable-body-row-cell" header="y2021">Content</td>
				<td class="indexTable-body-row-cell u-textRight" header="y2021">
					<strong>7778.80 €</strong>
				</td>
			</tr>
		</tbody>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row" id="r4">
				<th class="indexTable-body-row-transparentCell" colspan="2" id="y2022">
					<div class="indexTable-body-row-cellTitle">
						<button class="indexTable-body-row-cellTitle-button button mod-text mod-onlyIcon" aria-expanded="true" aria-controls="r5" type="button">
							<span class="lucca-icon icon-arrowChevronBottom" aria-hidden="true"></span>
							<span class="u-mask">Hide details</span>
						</button>
						<span class="indexTable-body-row-cellTitle-title">2022</span>
						<span class="numericBadge">1</span>
					</div>
				</th>
				<th class="indexTable-body-row-transparentCell u-textRight">
					<span>Total : </span>
					<strong>200.00 €</strong>
				</th>
			</tr>
			<tr class="indexTable-body-row" id="r5">
				<td class="indexTable-body-row-cell" header="y2022">Content</td>
				<td class="indexTable-body-row-cell" header="y2022">Content</td>
				<td class="indexTable-body-row-cell u-textRight" header="y2022">
					<strong>200.00 €</strong>
				</td>
			</tr>
		</tbody>
	</table>
	`;
}

const Template: StoryFn<IndexTableNestedStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Nested = Template.bind({});
Nested.args = { };
