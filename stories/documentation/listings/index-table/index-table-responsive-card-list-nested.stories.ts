import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableResponsiveCardListNestedStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Responsive Card List Nested',
	argTypes: {

	},
} as Meta;

function getTemplate(args: IndexTableResponsiveCardListNestedStory): string {
	return `<table class="indexTable mod-selectable mod-stackable mod-responsiveCardList">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-transparentCell" scope="col">
				<label class="formLabel u-mask" for="allchbx">Select all items</label>
				<span class="checkboxField indexTable-head-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="allchbx" checked aria-checked="mixed"
						aria-controls="r0chbx r1chbx r2chbx r3chbx r4chbx r5chbx r6chbx r7chbx r8chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span
							class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-head-row-transparentCell" scope="col"></th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row" id="r0">
			<th class="indexTable-body-row-transparentCell">
				<label class="formLabel u-mask" for="r0chbx">Select all lines for 2021</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" checked aria-checked="mixed" type="checkbox" id="r0chbx"
						aria-controls="r1chbx r2chbx r3chbx r4chbx r5chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span
							class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="4" id="y2021">
				<div class="indexTable-body-row-cellTitle">
					<button class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true" aria-controls="r1 r2 r3 r4 r5" type="button" id="r0btn">
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">2021</span>
					<span class="numericBadge">3</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r1">
			<th class="indexTable-body-row-transparentCell" header="y2021" colspan="2">
				<label class="formLabel u-mask" for="r1chbx">Select all items for september 2021</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r1chbx" aria-controls="r2chbx"/>
					<span class="checkboxField-icon" aria-hidden="true"><span
							class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="3" id="september" header="y2021">
				<div class="indexTable-body-row-cellTitle">
					<button class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true" aria-controls="r2" type="button" id="r1btn">
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">September</span>
					<span class="numericBadge">1</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r2">
			<td class="indexTable-body-row-transparentCell" header="y2021 september" colspan="2">
				<label class="formLabel u-mask" for="r2chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r2chbx"/>
					<span class="checkboxField-icon" aria-hidden="true"><span
							class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell" header="y2021 september">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell" header="y2021 september">Content</td>
			<td class="indexTable-body-row-cell" header="y2021 september">Content</td>
		</tr>
		<tr class="indexTable-body-row" id="r3">
			<th class="indexTable-body-row-transparentCell" header="y2021" colspan="2">
				<label class="formLabel u-mask" for="r3chbx">Select all items for october 2021</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r3chbx" aria-controls="r4chbx r5chbx" checked aria-checked="mixed" />
					<span class="checkboxField-icon" aria-hidden="true"><span
							class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="3" id="october" header="y2021">
				<div class="indexTable-body-row-cellTitle">
					<button class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true" aria-controls="r4 r5" type="button" id="r3btn">
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">October (stacks for test !)</span>
					<span class="numericBadge">2</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row mod-stack3" id="r4">
			<td class="indexTable-body-row-transparentCell" header="y2021 october" colspan="2">
				<label class="formLabel u-mask" for="r4chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" checked id="r4chbx"/>
					<span class="checkboxField-icon" aria-hidden="true"><span
							class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell" header="y2021 october">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell" header="y2021 october">Content</td>
			<td class="indexTable-body-row-cell" header="y2021 october">Content</td>
		</tr>
		<tr class="indexTable-body-row" id="r5">
			<td class="indexTable-body-row-transparentCell" header="y2021 october" colspan="2">
				<label class="formLabel u-mask" for="r5chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r5chbx"/>
					<span class="checkboxField-icon" aria-hidden="true"><span
							class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell" header="y2021 october">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell" header="y2021 october">Content</td>
			<td class="indexTable-body-row-cell" header="y2021 october">Content</td>
		</tr>
	</tbody>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row" id="r6">
			<th class="indexTable-body-row-transparentCell">
				<label class="formLabel u-mask" for="r6chbx">Select all items for 2022</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r6chbx" aria-controls="r7chbx r8chbx"/>
					<span class="checkboxField-icon" aria-hidden="true"><span
							class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="4" id="y2022">
				<div class="indexTable-body-row-cellTitle">
					<button class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true" aria-controls="r7 r8" type="button" id="r6btn">
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">2022</span>
					<span class="numericBadge">1</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r7">
			<th class="indexTable-body-row-transparentCell" header="y2022" colspan="2">
				<label class="formLabel u-mask" for="r7chbx">Select all items for january 2022</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r7chbx" aria-controls="r8chbx"/>
					<span class="checkboxField-icon" aria-hidden="true"><span
							class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-body-row-transparentCell" colspan="3" id="january" header="y2022">
				<div class="indexTable-body-row-cellTitle">
					<button class="indexTable-body-row-cellTitle-button button"
						aria-expanded="true" aria-controls="r8" type="button" id="r7btn">
						<span class="lucca-icon icon-arrowChevronTop" aria-hidden="true"></span>
						<span class="u-mask">Hide details</span>
					</button>
					<span class="indexTable-body-row-cellTitle-title">January</span>
					<span class="numericBadge">1</span>
				</div>
			</th>
		</tr>
		<tr class="indexTable-body-row" id="r8">
			<td class="indexTable-body-row-transparentCell" header="y2022 january" colspan="2">
				<label class="formLabel u-mask" for="r8chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r8chbx"/>
					<span class="checkboxField-icon" aria-hidden="true"><span
							class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell" header="y2022 january">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell" header="y2022 january">Content</td>
			<td class="indexTable-body-row-cell" header="y2022 january">Content</td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<IndexTableResponsiveCardListNestedStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const ResponsiveCardList = Template.bind({});
ResponsiveCardList.args = { };
