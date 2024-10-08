import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableStackableStory {}

export default {
	title: 'Documentation/Listings/Index Table/Stackable',
	argTypes: {},
} as Meta;

function getTemplate(args: IndexTableStackableStory): string {
	return `<table class="indexTable mod-selectable mod-stackable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-transparentCell" scope="col">
				<label class="formLabel u-mask" for="allchbx">Select all items</label>
				<span class="checkboxField indexTable-head-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="allchbx"
						aria-controls="r0chbx r1chbx r2chbx" checked aria-checked="mixed" />
					<span class="checkboxField-icon" aria-hidden="true"><span
							class="checkboxField-icon-check"></span></span>
				</span>
			</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-transparentCell">
				<label class="formLabel u-mask" for="r1chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r0chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span
							class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row mod-stack2">
			<td class="indexTable-body-row-transparentCell">
				<label class="formLabel u-mask" for="r0chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r1chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span
							class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row mod-stack3">
			<td class="indexTable-body-row-transparentCell">
				<label class="formLabel u-mask" for="r2chbx">Select this item</label>
				<span class="checkboxField indexTable-body-row-cell-checkbox">
					<input class="checkboxField-input" type="checkbox" id="r2chbx" />
					<span class="checkboxField-icon" aria-hidden="true"><span
							class="checkboxField-icon-check"></span></span>
				</span>
			</td>
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<IndexTableStackableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Stackable = Template.bind({});
Stackable.args = {};
