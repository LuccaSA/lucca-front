import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableNestedSelectableStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Nested Selectable',
	argTypes: {
		
	},
} as Meta;

function getTemplate(args: IndexTableNestedSelectableStory): string {
	return `
	<table class="indexTable mod-selectable">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-cellEmpty" scope="col">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select all</span>
					</label>
				</th>
				<th class="indexTable-head-row-cell" scope="col"></th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row" id="r0">
				<th class="indexTable-body-row-cellEmpty">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select this line</span>
					</label>
				</th>
				<th class="indexTable-body-row-cellEmpty" colspan="4" id="y2021">
					<div class="indexTable-body-row-cellTitle">
						<button class="button mod-text mod-onlyIcon" aria-expanded="true" aria-controls="r1 r2 r3 r4 r5" type="button">
							<span class="lucca-icon icon-arrowChevronBottom" aria-hidden="true"></span>
							<span class="u-mask">Hide details</span>
						</button>
						<span class="indexTable-body-rowGroup-cellTitle-title">2021</span>
						<span class="numericBadge">4</span>
					</div>
				</th>
			</tr>
			<tr class="indexTable-body-row" id="r1">
				<th class="indexTable-body-row-cellEmpty" header="y2021"></th>
				<th class="indexTable-body-row-cellEmpty" header="y2021">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select this line</span>
					</label>
				</th>
				<th class="indexTable-body-row-cellEmpty" colspan="3" id="september" header="y2021">
					<div class="indexTable-body-row-cellTitle">
						<button class="button mod-text mod-onlyIcon" aria-expanded="true" aria-controls="r2" type="button">
							<span class="lucca-icon icon-arrowChevronBottom" aria-hidden="true"></span>
							<span class="u-mask">Hide details</span>
						</button>
						<span class="indexTable-body-rowGroup-cellTitle-title">September</span>
						<span class="numericBadge">1</span>
					</div>
				</th>
			</tr>
			<tr class="indexTable-body-row" id="r2">
				<td class="indexTable-body-row-cellEmpty" header="y2021 september"></td>
				<td class="indexTable-body-row-cellEmpty" header="y2021 september">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select this line</span>
					</label>
				</td>
				<td class="indexTable-body-row-cell" header="y2021 september">Content</td>
				<td class="indexTable-body-row-cell" header="y2021 september">Content</td>
				<td class="indexTable-body-row-cell" header="y2021 september">Content</td>
			</tr>
			<tr class="indexTable-body-row" id="r3">
				<th class="indexTable-body-row-cellEmpty" header="y2021"></th>
				<th class="indexTable-body-row-cellEmpty" header="y2021">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select this line</span>
					</label>
				</th>
				<th class="indexTable-body-row-cellEmpty" colspan="3" id="october" header="y2021">
					<div class="indexTable-body-row-cellTitle">
						<button class="button mod-text mod-onlyIcon" aria-expanded="true" aria-controls="r4 r5" type="button">
							<span class="lucca-icon icon-arrowChevronBottom" aria-hidden="true"></span>
							<span class="u-mask">Hide details</span>
						</button>
						<span class="indexTable-body-rowGroup-cellTitle-title">october</span>
						<span class="numericBadge">2</span>
					</div>
				</th>
			</tr>
			<tr class="indexTable-body-row" id="r4">
				<td class="indexTable-body-row-cellEmpty" header="y2021 october"></td>
				<td class="indexTable-body-row-cellEmpty" header="y2021 october">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" checked />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select this line</span>
					</label>
				</td>
				<td class="indexTable-body-row-cell" header="y2021 october">Content</td>
				<td class="indexTable-body-row-cell" header="y2021 october">Content</td>
				<td class="indexTable-body-row-cell" header="y2021 october">Content</td>
			</tr>
			<tr class="indexTable-body-row" id="r5">
				<td class="indexTable-body-row-cellEmpty" header="y2021 october"></td>
				<td class="indexTable-body-row-cellEmpty" header="y2021 october">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select this line</span>
					</label>
				</td>
				<td class="indexTable-body-row-cell" header="y2021 october">Content</td>
				<td class="indexTable-body-row-cell" header="y2021 october">Content</td>
				<td class="indexTable-body-row-cell" header="y2021 october">Content</td>
			</tr>
		</tbody>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row" id="r6">
				<th class="indexTable-body-row-cellEmpty">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select this line</span>
					</label>
				</th>
				<th class="indexTable-body-row-cellEmpty" colspan="4" id="y2022">
					<div class="indexTable-body-row-cellTitle">
						<button class="button mod-text mod-onlyIcon" aria-expanded="true" aria-controls="r7 r8" type="button">
							<span class="lucca-icon icon-arrowChevronBottom" aria-hidden="true"></span>
							<span class="u-mask">Hide details</span>
						</button>
						<span class="indexTable-body-rowGroup-cellTitle-title">2022</span>
						<span class="numericBadge">4</span>
					</div>
				</th>
			</tr>
			<tr class="indexTable-body-row" id="r7">
				<th class="indexTable-body-row-cellEmpty" header="y2022"></th>
				<th class="indexTable-body-row-cellEmpty" header="y2022">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select this line</span>
					</label>
				</th>
				<th class="indexTable-body-row-cellEmpty" colspan="3" id="january" header="y2022">
					<div class="indexTable-body-row-cellTitle">
						<button class="button mod-text mod-onlyIcon" aria-expanded="true" aria-controls="r8" type="button">
							<span class="lucca-icon icon-arrowChevronBottom" aria-hidden="true"></span>
							<span class="u-mask">Hide details</span>
						</button>
						<span class="indexTable-body-rowGroup-cellTitle-title">january</span>
						<span class="numericBadge">1</span>
					</div>
				</th>
			</tr>
			<tr class="indexTable-body-row" id="r8">
				<td class="indexTable-body-row-cellEmpty" header="y2022 january"></td>
				<td class="indexTable-body-row-cellEmpty" header="y2022 january">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select this line</span>
					</label>
				</td>
				<td class="indexTable-body-row-cell" header="y2022 january">Content</td>
				<td class="indexTable-body-row-cell" header="y2022 january">Content</td>
				<td class="indexTable-body-row-cell" header="y2022 january">Content</td>
			</tr>
		</tbody>
	</table>
	`;
}

const Template: StoryFn<IndexTableNestedSelectableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const NestedSelectable = Template.bind({});
NestedSelectable.args = { };
